// idioms.test.ts — the six communication trunks (spec: docs/superpowers/specs/2026-08-13-binding-resolution-design.md §二).
//
// These tests pin the contract of the idiom table: match by *declaration*, never by call-site text.
// Fixtures are in-memory ts-morph projects, so they run without Rocket.Chat's node_modules.
// They prove the mechanism works; they say nothing about coverage on the real repo — that is the
// non-zero self-check's job (§2.9), and its baselines must come from a real index build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Project, type SourceFile } from 'ts-morph';
import { extractSlots, IDIOMS, selfCheckIdioms } from '../../src/indexer/idioms.js';

const OPTS = { repoRoot: '/repo', keyspaceScope: 'test@extractor-v12' };

function project(files: Record<string, string>): Project {
    const p = new Project({ useInMemoryFileSystem: true, compilerOptions: { target: 99, strict: false } });
    for (const [name, body] of Object.entries(files)) p.createSourceFile(`/repo/${name}`, body);
    return p;
}

const slotsIn = (p: Project, file: string) => extractSlots(p.getSourceFileOrThrow(`/repo/${file}`), OPTS).slots;
const allSlots = (p: Project) =>
    p.getSourceFiles().flatMap((sf: SourceFile) => extractSlots(sf, OPTS).slots);

// The callbacks registry as it exists in apps/meteor/server/lib/callbacks/callbacksBase.ts.
const CALLBACKS_BASE = `
export class Callbacks {
    add(hook: string, callback: (...args: any[]) => any, priority?: number, id?: string) {}
    run(hook: string, ...args: any[]) {}
    runAsync(hook: string, ...args: any[]) {}
}
export const callbacks = new Callbacks();
`;

test('callbacks: register slot carries the hook key and the handler it registers', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'notifyUsersOnMessage.ts': `
            import { callbacks } from './callbacksBase';
            export function notifyUsersOnMessage() {}
            callbacks.add('afterSaveMessage', notifyUsersOnMessage);
        `,
    });

    const slots = slotsIn(p, 'notifyUsersOnMessage.ts');

    assert.equal(slots.length, 1);
    assert.equal(slots[0].space, 'callbacks');
    assert.equal(slots[0].role, 'register');
    assert.equal(slots[0].key, 'afterSaveMessage');
    assert.equal(slots[0].handler, 'notifyUsersOnMessage.ts#notifyUsersOnMessage');
});

test('callbacks: run is the dispatch side of the same key', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'sendMessage.ts': `
            import { callbacks } from './callbacksBase';
            export async function sendMessage(message: any, room: any) {
                await callbacks.run('afterSaveMessage', message, room);
            }
        `,
    });

    const slots = slotsIn(p, 'sendMessage.ts');

    assert.equal(slots.length, 1);
    assert.equal(slots[0].role, 'dispatch');
    assert.equal(slots[0].key, 'afterSaveMessage');
    assert.equal(slots[0].at, 'sendMessage.ts#sendMessage');
});

test('callbacks: alias import and this.callbacks reach the same decl as a plain call', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'plain.ts': `
            import { callbacks } from './callbacksBase';
            callbacks.add('afterSaveMessage', () => {});
        `,
        'aliased.ts': `
            import { callbacks as cbs } from './callbacksBase';
            cbs.add('afterSaveMessage', () => {});
        `,
        'member.ts': `
            import { callbacks } from './callbacksBase';
            export class Hooks {
                private callbacks = callbacks;
                install() { this.callbacks.add('afterSaveMessage', () => {}); }
            }
        `,
    });

    const decls = new Set(allSlots(p).map((s) => s.decl));

    // One decl, three call-site spellings. This is why the table matches declarations:
    // objText === 'callbacks' would have missed two of these.
    assert.equal(decls.size, 1);
    assert.equal([...decls][0], 'callbacksBase.ts#Callbacks.add');
});

test('callbacks: overload signatures collapse to one decl', () => {
    const p = project({
        // The real callbacksBase.ts declares `add` four times (three overload signatures plus the
        // implementation) and `run` four times. getSymbol().getDeclarations() returns all of them,
        // and [0] is a signature, not the implementation — so an idiom matching only the
        // implementation, or a slot keyed on whichever declaration the checker happened to return,
        // splits one registry into four.
        'callbacksBase.ts': `
            export class Callbacks {
                add(hook: string, callback: () => void): void;
                add(hook: string, callback: () => void, priority: number): void;
                add(hook: string, callback: (...args: any[]) => any, priority?: number, id?: string) {}
                run(hook: string): void;
                run(hook: string, ...args: any[]) {}
            }
            export const callbacks = new Callbacks();
        `,
        'notify.ts': `
            import { callbacks } from './callbacksBase';
            callbacks.add('afterSaveMessage', () => {});
            callbacks.add('afterSaveMessage', () => {}, 100);
        `,
        'sender.ts': `
            import { callbacks } from './callbacksBase';
            export function send() { callbacks.run('afterSaveMessage', 1); }
        `,
    });

    const slots = allSlots(p);
    const decls = [...new Set(slots.map((s) => s.decl))].sort();

    // Two decls total — one per role — not six.
    assert.deepEqual(decls, ['callbacksBase.ts#Callbacks.add', 'callbacksBase.ts#Callbacks.run']);
    assert.equal(slots.filter((s) => s.role === 'register').length, 2);
    assert.equal(slots.filter((s) => s.role === 'dispatch').length, 1);
});

test('callbacks: a same-named add on an unrelated class produces no slot', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'unrelated.ts': `
            export class Callbacks {
                add(hook: string, fn: () => void) {}
            }
            export const callbacks = new Callbacks();
        `,
        'caller.ts': `
            import { callbacks } from './unrelated';
            import { callbacks as real } from './callbacksBase';
            callbacks.add('afterSaveMessage', () => {});
            real.add('afterDeleteMessage', () => {});
        `,
    });

    // Identical source text to the real registration, different declaration. Text matching
    // cannot tell these apart; declaration matching must. The real registration in the same
    // file is the positive control: an extractor that returns nothing must not pass this.
    const slots = slotsIn(p, 'caller.ts');

    assert.deepEqual(slots.map((s) => s.key), ['afterDeleteMessage']);
    assert.equal(slots[0].decl, 'callbacksBase.ts#Callbacks.add');
});

test('service-events: onEvent registers and broadcast dispatches', () => {
    const p = project({
        'ServiceClass.ts': `
            export abstract class ServiceClass {
                protected name: string;
                onEvent(event: string, handler: (...args: any[]) => void) {}
            }
            export const api = {
                broadcast(event: string, ...args: any[]) {},
                registerService(instance: any) {},
            };
        `,
        'presence.ts': `
            import { ServiceClass } from './ServiceClass';
            export class Presence extends ServiceClass {
                protected name = 'presence';
                constructor() {
                    super();
                    this.onEvent('user.updateCustomStatus', () => {});
                }
            }
        `,
        'emitter.ts': `
            import { api } from './ServiceClass';
            export function notify() {
                api.broadcast('user.updateCustomStatus', {});
            }
        `,
    });

    const slots = allSlots(p).filter((s) => s.space === 'service-events');

    assert.deepEqual(
        slots.map((s) => [s.role, s.key]).sort(),
        [['dispatch', 'user.updateCustomStatus'], ['register', 'user.updateCustomStatus']],
    );
});

test('rest: client path and server route normalize to the same key', () => {
    const p = project({
        'ApiClass.ts': `
            export class APIClass {
                addRoute(subpath: string, options: any, endpoints?: any) {}
            }
            export const API = { v1: new APIClass() };
        `,
        'useEndpoint.ts': `
            export function useEndpoint(method: string, path: string) { return async () => {}; }
        `,
        'server.ts': `
            import { API } from './ApiClass';
            API.v1.addRoute('users.info', {}, { get() {} });
        `,
        'client.ts': `
            import { useEndpoint } from './useEndpoint';
            export function useUserInfo() {
                return useEndpoint('GET', '/v1/users.info');
            }
        `,
    });

    const rest = allSlots(p).filter((s) => s.space === 'rest');

    // Without normalization the two sides never meet: the client writes /v1/users.info,
    // the server registers users.info.
    assert.deepEqual([...new Set(rest.map((s) => s.key))], ['users.info']);
    assert.deepEqual(rest.map((s) => s.role).sort(), ['dispatch', 'register']);
});

test('rest: the HTTP verb is not the key', () => {
    const p = project({
        'useEndpoint.ts': `export function useEndpoint(method: string, path: string) { return async () => {}; }`,
        'client.ts': `
            import { useEndpoint } from './useEndpoint';
            export const get = useEndpoint('GET', '/v1/users.info');
            export const post = useEndpoint('POST', '/v1/users.update');
        `,
    });

    const keys = slotsIn(p, 'client.ts').map((s) => s.key);

    // The declaration-type route (2.4) locked onto Method instead of the path and produced
    // 4 keys for 536 call sites. argIndex must point at the path.
    assert.deepEqual(keys.sort(), ['users.info', 'users.update']);
});

test('streamer: the channel name comes from the constructor argument', () => {
    const p = project({
        'Streamer.ts': `
            export class Streamer {
                constructor(public name: string, options?: any) {}
            }
        `,
        'notifications.ts': `
            import { Streamer } from './Streamer';
            export const roomMessages = new Streamer('room-messages');
        `,
    });

    const slots = slotsIn(p, 'notifications.ts');

    assert.equal(slots.length, 1);
    assert.equal(slots[0].space, 'streamer');
    assert.equal(slots[0].role, 'register');
    assert.equal(slots[0].key, 'room-messages');
    assert.equal(slots[0].form, '1c');
});

test('streamer: a channel registered through an injected constructor is still a registration', () => {
    const p = project({
        // The shape the fixture above does not have and the real repo does. `Streamer` is abstract;
        // nobody writes `new Streamer(...)`. NotificationsModule takes the concrete class as a
        // constructor parameter and writes `new this.Streamer('notify-room')`, so the callee
        // resolves to a Parameter — not a def kind, and therefore invisible to declaration
        // matching. Measured on apps/meteor before this rule: 0 streamer registrations against a
        // baseline of 10 both-sides keys. Type identity is what survives dependency injection.
        'types.ts': `
            export interface IStreamer { name: string }
            export interface IStreamerConstructor { new (name: string, options?: unknown): IStreamer }
        `,
        'notifications.module.ts': `
            import type { IStreamer, IStreamerConstructor } from './types';
            export class NotificationsModule {
                public readonly streamRoom: IStreamer;
                public readonly streamAll: IStreamer;
                constructor(private Streamer: IStreamerConstructor) {
                    this.streamRoom = new this.Streamer('notify-room');
                    this.streamAll = new this.Streamer('notify-all', { retransmit: false });
                }
            }
        `,
    });

    const slots = slotsIn(p, 'notifications.module.ts').filter((s) => s.space === 'streamer');

    assert.deepEqual(slots.map((s) => s.key).sort(), ['notify-all', 'notify-room']);
    assert.deepEqual([...new Set(slots.map((s) => s.role))], ['register']);
    assert.deepEqual([...new Set(slots.map((s) => s.form))], ['1c']);
});

test('api.call: reflection over the registered instance produces ns.method keys', () => {
    const p = project({
        'ServiceClass.ts': `
            export abstract class ServiceClass {
                protected name: string;
            }
            export const api = { registerService(instance: any) {} };
        `,
        'authorization.ts': `
            import { ServiceClass, api } from './ServiceClass';
            export class AuthorizationService extends ServiceClass {
                protected name = 'authorization';
                async canAccessRoom(room: any, user: any) { return true; }
                async hasPermission(uid: string, permission: string) { return true; }
            }
            api.registerService(new AuthorizationService());
        `,
    });

    const slots = slotsIn(p, 'authorization.ts').filter((s) => s.space === 'api-call');

    // registerService takes no key argument (form 1d). The keys only exist if the extractor
    // replays the same reflection LocalBroker does at runtime.
    assert.deepEqual(
        slots.map((s) => s.key).sort(),
        ['authorization.canAccessRoom', 'authorization.hasPermission'],
    );
    assert.equal(slots[0].form, '1d');
});

test('api.call: slots carry the deployment variant', () => {
    const p = project({
        'ServiceClass.ts': `
            export abstract class ServiceClass { protected name: string; }
            export const api = { registerService(instance: any) {} };
        `,
        'authorization.ts': `
            import { ServiceClass, api } from './ServiceClass';
            export class AuthorizationService extends ServiceClass {
                protected name = 'authorization';
                async canAccessRoom() { return true; }
            }
            api.registerService(new AuthorizationService());
        `,
    });

    const slots = extractSlots(p.getSourceFileOrThrow('/repo/authorization.ts'), {
        ...OPTS, variant: 'microservices',
    }).slots.filter((s) => s.space === 'api-call');

    // Same source, two topologies: local Map vs cross-process. One graph cannot hold both.
    assert.equal(slots[0].variant, 'microservices');
});

test('meteor-methods: the key is the object property name, not an argument', () => {
    const p = project({
        // Faithful to the real repo: Meteor is not declared in the repo's own source. It resolves
        // to two .d.ts files — @types/meteor under node_modules and the repo's own augmentation
        // under definition/externals. Declaring a local meteor.ts here (as this fixture first did)
        // hides the only hard part of this trunk.
        'definition/externals/meteor/meteor.d.ts': `
            declare module 'meteor/meteor' {
                export namespace Meteor {
                    function methods(handlers: Record<string, Function>): void;
                    function call(name: string, ...args: unknown[]): unknown;
                }
            }
        `,
        'rooms.ts': `
            import { Meteor } from 'meteor/meteor';
            Meteor.methods({
                'rooms.get'(params: unknown) { return params; },
                'rooms.leave'(rid: string) { return rid; },
            });
        `,
    });

    const slots = slotsIn(p, 'rooms.ts');

    // Form 1b: the argIndex-based extraction produces nothing here — the key is a property name.
    assert.deepEqual(slots.map((s) => s.key).sort(), ['rooms.get', 'rooms.leave']);
    assert.deepEqual([...new Set(slots.map((s) => s.role))], ['register']);
    assert.deepEqual([...new Set(slots.map((s) => s.form))], ['1b']);
    // Each handler is the method that implements it, so the edge has somewhere to go.
    assert.deepEqual(slots.map((s) => s.handler).sort(),
        ['rooms.ts#rooms.get', 'rooms.ts#rooms.leave'].sort());
});

test('meteor-methods: a computed property name is unbound, never guessed', () => {
    const p = project({
        'definition/externals/meteor/meteor.d.ts': `
            declare module 'meteor/meteor' {
                export namespace Meteor {
                    function methods(handlers: Record<string, Function>): void;
                }
            }
        `,
        'dynamic.ts': `
            import { Meteor } from 'meteor/meteor';
            const prefix = 'rooms';
            Meteor.methods({ [\`\${prefix}.get\`]() { return 1; } });
        `,
    });

    const { slots, unbound } = extractSlots(p.getSourceFileOrThrow('/repo/dynamic.ts'), OPTS);

    assert.deepEqual(slots, []);
    assert.equal(unbound.length, 1);
    assert.equal(unbound[0].reason, 'non-literal-key');
});

test('a non-literal key is reported as unbound instead of guessed', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'dynamic.ts': `
            import { callbacks } from './callbacksBase';
            export function install(name: string) {
                callbacks.add(\`after\${name}\`, () => {});
            }
        `,
    });

    const { slots, unbound } = extractSlots(p.getSourceFileOrThrow('/repo/dynamic.ts'), OPTS);

    assert.deepEqual(slots, []);
    assert.equal(unbound.length, 1);
    assert.equal(unbound[0].reason, 'non-literal-key');
    assert.match(unbound[0].text, /after/);
});

test('out-of-scope registries produce no slot', () => {
    const p = project({
        'settings.ts': `
            export class CachedSettings {
                get(id: string) {}
                add(id: string, value: unknown) {}
            }
            export const settings = new CachedSettings();
        `,
        'callbacksBase.ts': CALLBACKS_BASE,
        'reader.ts': `
            import { settings } from './settings';
            import { callbacks } from './callbacksBase';
            export function isEnabled() { return settings.get('E2E_Enable'); }
            callbacks.add('afterSaveMessage', () => {});
        `,
    });

    // Settings are a define/reference pair, not dispatch (§2.3). The reads-setting edge is
    // produced elsewhere; it must never enter the slot table. The callbacks registration in
    // the same file is the positive control.
    const slots = slotsIn(p, 'reader.ts');

    assert.deepEqual(slots.map((s) => s.space), ['callbacks']);
});

test('every slot carries the fields the shard format requires', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'notify.ts': `
            import { callbacks } from './callbacksBase';
            callbacks.add('afterSaveMessage', () => {});
        `,
    });

    const slot = slotsIn(p, 'notify.ts')[0];

    assert.equal(slot.realm, 'server');
    assert.equal(slot.form, '1a');
    assert.equal(slot.keyResolution, 'literal-union');
    assert.equal(slot.keyspaceScope, 'test@extractor-v12');
    // No edge in this version has been observed running (§2.11).
    assert.equal(slot.evidence, 'static');
});

test('a top-level registration is attributed to the module def', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'notify.ts': `
            import { callbacks } from './callbacksBase';
            callbacks.add('afterSaveMessage', () => {});
        `,
    });

    assert.equal(slotsIn(p, 'notify.ts')[0].at, 'notify.ts#<module>');
});

test('the idiom table covers exactly the six trunks plus the out-of-scope marker', () => {
    const spaces = [...new Set(IDIOMS.map((i) => i.space))].sort();

    assert.deepEqual(spaces, [
        'api-call', 'callbacks', 'meteor-methods', 'rest', 'service-events',
        'slash-commands', 'streamer',
    ]);
    assert.equal(IDIOMS.find((i) => i.space === 'slash-commands')?.scope, 'out');
});

test('every in-scope trunk declares both a register and a dispatch idiom', () => {
    const trunks = ['callbacks', 'service-events', 'rest', 'streamer', 'api-call', 'meteor-methods'];

    for (const space of trunks) {
        const roles = new Set(IDIOMS.filter((i) => i.space === space).map((i) => i.role));
        assert.ok(roles.has('register'), `${space} has no register idiom`);
        assert.ok(roles.has('dispatch'), `${space} has no dispatch idiom`);
    }
});

test('the self-check fails the build when a trunk yields zero keys', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'notify.ts': `
            import { callbacks } from './callbacksBase';
            callbacks.add('afterSaveMessage', () => {});
        `,
    });

    // Only callbacks produced anything: the other five trunks are silently dead.
    // A wrong idiom and a right idiom look identical in the logs — this is the one
    // thing standing between us and SlashCommandClass.add matching 0 rows again.
    assert.throws(() => selfCheckIdioms(allSlots(p)), /rest|zero|0 keys/i);
});

test('the self-check reports per-space counts including both-sides keys', () => {
    const p = project({
        'callbacksBase.ts': CALLBACKS_BASE,
        'notify.ts': `
            import { callbacks } from './callbacksBase';
            callbacks.add('afterSaveMessage', () => {});
            callbacks.add('afterDeleteMessage', () => {});
        `,
        'sender.ts': `
            import { callbacks } from './callbacksBase';
            export function send() { callbacks.run('afterSaveMessage'); }
        `,
    });

    const row = selfCheckIdioms(allSlots(p), { throwOnZero: false })
        .find((r) => r.space === 'callbacks')!;

    assert.equal(row.keys, 2);
    assert.equal(row.registerSites, 2);
    assert.equal(row.dispatchSites, 1);
    assert.equal(row.bothSidesKeys, 1); // afterDeleteMessage is registered but never run
});
