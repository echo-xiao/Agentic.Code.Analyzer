// overrides.test.ts — coverage mode (spec: docs/superpowers/specs/2026-08-13-binding-resolution-design.md §2.7).
//
// Coverage mode adds no edges. It annotates existing ones with "there is a second
// implementation here, and this is its condition". It does NOT claim to know which one wins
// at runtime — that is what resolvedAt: 'runtime' records.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Project } from 'ts-morph';
import { extractOverrides, multiImplementationKeys } from '../../src/indexer/overrides.js';

const OPTS = { repoRoot: '/repo', keyspaceScope: 'test@extractor-v12' };

function project(files: Record<string, string>): Project {
    const p = new Project({ useInMemoryFileSystem: true, compilerOptions: { target: 99, strict: false } });
    for (const [name, body] of Object.entries(files)) p.createSourceFile(`/repo/${name}`, body);
    return p;
}

const overridesOf = (p: Project) => extractOverrides(p.getSourceFiles(), OPTS);

const MODELS = `
export const models: Record<string, unknown> = {};
export function registerModel(name: string, instance: unknown) { models[name] = instance; }
export const License = { onLicense(mod: string, cb: () => Promise<void>) {} };
`;

test('the same model key registered twice yields one override, not a new edge', () => {
    const p = project({
        'models.ts': MODELS,
        'ce.ts': `
            import { registerModel } from './models';
            export class RoomsRaw {}
            registerModel('IRoomsModel', new RoomsRaw());
        `,
        'ee.ts': `
            import { registerModel, License } from './models';
            export class RoomsEE {}
            void License.onLicense('livechat-enterprise', async () => {
                registerModel('IRoomsModel', new RoomsEE());
            });
        `,
    });

    const overrides = overridesOf(p);

    assert.equal(overrides.length, 1);
    assert.equal(overrides[0].key, 'IRoomsModel');
    assert.equal(overrides[0].target, 'ce.ts#RoomsRaw');
    assert.equal(overrides[0].by, 'ee.ts#RoomsEE');
    assert.equal(overrides[0].source, 'registerModel');
});

test('an override records the condition expression and where it is evaluated', () => {
    const p = project({
        'models.ts': MODELS,
        'ce.ts': `
            import { registerModel } from './models';
            export class RoomsRaw {}
            registerModel('IRoomsModel', new RoomsRaw());
        `,
        'ee.ts': `
            import { registerModel, License } from './models';
            export class RoomsEE {}
            void License.onLicense('livechat-enterprise', async () => {
                registerModel('IRoomsModel', new RoomsEE());
            });
        `,
    });

    const { condition } = overridesOf(p)[0];

    // Structure, not a string: the reader needs the module name, not prose.
    assert.equal(condition.kind, 'license');
    assert.equal(condition.module, 'livechat-enterprise');
    assert.equal(condition.evalAt, 'import');
});

test('an override never claims to know which implementation wins', () => {
    const p = project({
        'models.ts': MODELS,
        'ce.ts': `
            import { registerModel } from './models';
            export class RoomsRaw {}
            registerModel('IRoomsModel', new RoomsRaw());
        `,
        'ee.ts': `
            import { registerModel, License } from './models';
            export class RoomsEE {}
            void License.onLicense('ee', async () => { registerModel('IRoomsModel', new RoomsEE()); });
        `,
    });

    // registerModel resolves by module import order, and the EE call is inside a dynamic
    // import() callback. Static analysis cannot answer this and must not pretend to.
    assert.equal(overridesOf(p)[0].resolvedAt, 'runtime');
});

test('patch injection records a condition that is re-evaluated on every call', () => {
    const p = project({
        'patch.ts': `
            export function makeFunction<T extends Function>(fn: T) {
                return Object.assign(fn, { patch(impl: T, cond?: () => boolean) {} });
            }
        `,
        'base.ts': `
            import { makeFunction } from './patch';
            export const getRoomBehavior = makeFunction(function getRoomBehavior() { return 'ce'; });
        `,
        'ee-patch.ts': `
            import { getRoomBehavior } from './base';
            import { License } from './license';
            getRoomBehavior.patch(function eeBehavior() { return 'ee'; }, () => License.hasModule('livechat'));
        `,
        'license.ts': `export const License = { hasModule(mod: string) { return false; } };`,
    });

    const patch = overridesOf(p).find((o) => o.source === 'patch-injection')!;

    assert.equal(patch.target, 'base.ts#getRoomBehavior');
    assert.equal(patch.by, 'ee-patch.ts#eeBehavior');
    // Not 'import': the license can expire mid-process and flip this back.
    assert.equal(patch.condition.evalAt, 'call');
});

test('a deployment-shape cutoff is a variant, not a condition', () => {
    const p = project({
        'streamerCentral.ts': `
            export const StreamerCentral = {
                emit(event: string, ...args: any[]) {},
                on(event: string, handler: () => void) {},
            };
        `,
        'ee-listener.ts': `
            import { StreamerCentral } from './streamerCentral';
            StreamerCentral.on('broadcast', () => {});
        `,
    });

    const overrides = overridesOf(p);

    // CE has zero listeners for this key. That is not "two implementations, one wins" —
    // it is "the edge has no target in this build". Filing it as a condition would put a
    // non-defect into the multi-implementation list.
    assert.deepEqual(overrides.filter((o) => o.condition?.kind === 'license'), []);
    const cutoff = overrides.find((o) => o.key === 'broadcast');
    assert.ok(cutoff, 'the deployment cutoff should still be recorded');
    assert.equal(cutoff.variant, 'monolith');
    assert.equal(cutoff.condition, undefined);
});

test('a module-level override records both the condition and the variant', () => {
    const p = project({
        'meteor.ts': `
            export const Meteor = { connection: { _stream: {} as unknown }, call(name: string) {} };
            export function isSdkTransportEnabled() { return false; }
        `,
        'overrides/ddpOverREST.ts': `
            import { Meteor, isSdkTransportEnabled } from '../meteor';
            export function ddpOverREST() {
                if (isSdkTransportEnabled()) { Meteor.call = function patched(name: string) {}; }
            }
        `,
    });

    const mod = overridesOf(p).find((o) => o.source === 'module-override')!;

    // This one changes how the boundary is crossed, not which handler runs: a Meteor method
    // call leaves over REST instead. Both REST and Meteor-methods key accounting depend on it.
    assert.ok(mod.condition, 'module overrides carry a condition');
    assert.ok(mod.variant, 'module overrides carry a variant');
});

test('overrides are enumerable as a multi-implementation list', () => {
    const p = project({
        'models.ts': MODELS,
        'ce.ts': `
            import { registerModel } from './models';
            export class RoomsRaw {}
            export class UsersRaw {}
            registerModel('IRoomsModel', new RoomsRaw());
            registerModel('IUsersModel', new UsersRaw());
        `,
        'ee.ts': `
            import { registerModel, License } from './models';
            export class RoomsEE {}
            void License.onLicense('ee', async () => { registerModel('IRoomsModel', new RoomsEE()); });
        `,
    });

    const list = multiImplementationKeys(overridesOf(p));

    // Only IRoomsModel has a second implementation. IUsersModel is registered once.
    assert.deepEqual(list.map((e) => e.key), ['IRoomsModel']);
    assert.equal(list[0].implementations.length, 2);
});

test('a single registration produces no override', () => {
    const p = project({
        'models.ts': MODELS,
        'ce.ts': `
            import { registerModel } from './models';
            export class UsersRaw {}
            export class RoomsRaw {}
            registerModel('IUsersModel', new UsersRaw());
            registerModel('IRoomsModel', new RoomsRaw());
        `,
        'ee.ts': `
            import { registerModel, License } from './models';
            export class RoomsEE {}
            void License.onLicense('ee', async () => { registerModel('IRoomsModel', new RoomsEE()); });
        `,
    });

    // IRoomsModel is the positive control: an extractor that returns nothing cannot pass by
    // being silent about IUsersModel.
    assert.deepEqual(overridesOf(p).map((o) => o.key), ['IRoomsModel']);
});
