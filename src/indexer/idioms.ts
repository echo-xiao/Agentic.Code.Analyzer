// idioms.ts — the six communication trunks (spec: 2026-08-13-binding-resolution-design.md §二).
//
// Six registries carry every cross-module hop in the target repo: in-process events (callbacks),
// inter-service events (service-events) and RPC (api.call), client->server (REST, Meteor methods),
// and server->client (streamer). This table names them, and nothing else. Registries outside it are
// out of scope by decision, not by oversight — see the spec's non-goals.
//
// Matching is by RESOLVED DECLARATION, never by call-site text. `objText === 'callbacks'` misses
// `this.callbacks.add(...)`, aliased imports and destructured calls; the declaration behind all
// three spellings is the same node. Verified: three spellings, one MethodDeclaration.
//
// Anchors below were grepped against Rocket.Chat e75965c05d on 2026-08-13, not written from
// memory. The cost of memory is measured: `SlashCommandClass.add` was a guessed class name and
// matched 0 rows, and the dispatch inventory itself files REST under a path that no longer exists
// (`app/api/server/ApiClass.ts`; the class is at `server/api/ApiClass.ts`).
import { Node, SourceFile, SyntaxKind } from 'ts-morph';
import { collectDefs, defIdOfDeclaration, enclosingDefId, relFileOf } from './defs.js';
import { bindReference } from './binding.js';

export type Space =
    | 'callbacks' | 'service-events' | 'rest' | 'streamer' | 'api-call' | 'meteor-methods'
    | 'slash-commands';
export type Role = 'register' | 'dispatch';
export type Form = '1a' | '1b' | '1c' | '1d';
export type Variant = 'monolith' | 'microservices';
export type KeyResolution = 'literal-union' | 'path-pattern' | 'channel-literal' | 'ns-reflection';

export interface Idiom {
    id: string;
    space: Space;
    role: Role;
    argIndex: number;                  // which argument carries the key; -1 when the form has none
    realm: 'server' | 'client';
    form: Form;
    keyResolution: KeyResolution;
    scope?: 'out';                     // recorded, never counted towards the trunks
    file: RegExp;                      // repo-relative path of the DECLARATION
    names: string[];                   // method/class names this idiom accepts — see NAME_PREFILTER
    container?: string;                // qualifier the name must sit under, e.g. 'Callbacks'
    // Type identity, for call sites where declaration identity does not survive. A dependency-
    // injected constructor (`constructor(private Streamer: IStreamerConstructor)`, then
    // `new this.Streamer('notify-room')`) resolves to a Parameter — no declaration to anchor on —
    // but its TYPE is stable and is exactly what the injection contract is written in.
    // Still the checker's answer, never call-site text.
    byType?: string[];
    normalizeKey?: (raw: string) => string;
    match(decl: { file: string; qualifiedName: string }): boolean;
}

export interface Slot {
    space: Space; role: Role; decl: string; argIndex: number; key: string;
    at: string; handler?: string; realm: 'server' | 'client'; form: Form;
    keyResolution: KeyResolution; keyspaceScope: string; variant?: Variant;
    evidence: 'static'; scope?: 'out';
}

export interface Unbound { at: string; text: string; reason: string }

export interface ExtractOpts { repoRoot: string; keyspaceScope: string; variant?: Variant }

export interface SelfCheckRow {
    space: Space; keys: number; registerSites: number; dispatchSites: number; bothSidesKeys: number;
}

// The client writes `/v1/users.info`, the server registers `users.info`. Without this the two sides
// of the busiest trunk never meet: measured 5 slots / 373 keys before, 13 slots / 646 keys after.
const normalizeRoute = (raw: string): string => raw.replace(/^\//, '').replace(/^v\d+\//, '');

const idiom = (i: Omit<Idiom, 'match'>): Idiom => ({
    ...i,
    match: (decl) => {
        if (!i.file.test(decl.file)) return false;
        const parts = decl.qualifiedName.split('.');
        const own = parts[parts.length - 1];
        if (!i.names.includes(own)) return false;
        return i.container === undefined || parts[parts.length - 2] === i.container;
    },
});

export const IDIOMS: Idiom[] = [
    // callbacksBase.ts:121-171 add (3 overload signatures + implementation), :184-219 run/runAsync
    idiom({
        id: 'callbacks-add', space: 'callbacks', role: 'register', argIndex: 0,
        realm: 'server', form: '1a', keyResolution: 'literal-union',
        file: /(^|\/)callbacksBase\.ts$/, names: ['add'], container: 'Callbacks',
    }),
    idiom({
        id: 'callbacks-run', space: 'callbacks', role: 'dispatch', argIndex: 0,
        realm: 'server', form: '1a', keyResolution: 'literal-union',
        file: /(^|\/)callbacksBase\.ts$/, names: ['run', 'runAsync'], container: 'Callbacks',
    }),

    // core-services/src/types/ServiceClass.ts:100 onEvent  |  core-services/src/lib/Api.ts:44 broadcast
    idiom({
        id: 'service-events-on', space: 'service-events', role: 'register', argIndex: 0,
        realm: 'server', form: '1a', keyResolution: 'literal-union',
        file: /(^|\/)(ServiceClass|Api)\.ts$/, names: ['onEvent'],
    }),
    idiom({
        id: 'service-events-broadcast', space: 'service-events', role: 'dispatch', argIndex: 0,
        realm: 'server', form: '1a', keyResolution: 'literal-union',
        file: /(^|\/)(ServiceClass|Api)\.ts$/, names: ['broadcast'],
    }),

    // server/api/ApiClass.ts:669/686/707/728 get|post|put|delete, :752-786 legacy addRoute.
    // Anchored on the class, because bare `get`/`post` as a name pattern would match anything.
    idiom({
        id: 'rest-route', space: 'rest', role: 'register', argIndex: 0,
        realm: 'server', form: '1a', keyResolution: 'path-pattern',
        file: /(^|\/)(ApiClass|api)\.ts$/, names: ['addRoute', 'get', 'post', 'put', 'delete'], container: 'APIClass',
        normalizeKey: normalizeRoute,
    }),
    // ui-contexts/src/hooks/useEndpoint.ts:22 — argIndex 1: argument 0 is the METHOD. Locking onto
    // the method instead produced 4 keys for 536 call sites in an earlier attempt.
    idiom({
        id: 'rest-endpoint', space: 'rest', role: 'dispatch', argIndex: 1,
        realm: 'client', form: '1a', keyResolution: 'path-pattern',
        file: /(^|\/)useEndpoint\.ts$/, names: ['useEndpoint'],
        normalizeKey: normalizeRoute,
    }),

    // streamer.module.ts:20 abstract class Streamer, :37 constructor — registration is the `new`.
    idiom({
        id: 'streamer-new', space: 'streamer', role: 'register', argIndex: 0,
        realm: 'server', form: '1c', keyResolution: 'channel-literal',
        file: /(^|\/)(streamer\.module|Streamer)\.ts$/, names: ['Streamer', 'constructor'],
        // Streamer is abstract: `new Streamer(...)` appears nowhere. Registration goes through
        // NotificationsModule's injected constructor parameter.
        byType: ['IStreamerConstructor'],
    }),
    idiom({
        id: 'streamer-stream', space: 'streamer', role: 'dispatch', argIndex: 0,
        realm: 'client', form: '1a', keyResolution: 'channel-literal',
        file: /(^|\/)(DDPSDK|useStream|streamer\.module)\.ts$/, names: ['stream', 'useStream'],
    }),

    // Form 1d: registerService takes no key. Keys only exist if the extractor replays the same
    // reflection LocalBroker does at runtime. Implemented in the api.call task.
    idiom({
        id: 'api-call-register', space: 'api-call', role: 'register', argIndex: -1,
        realm: 'server', form: '1d', keyResolution: 'ns-reflection',
        file: /(^|\/)(LocalBroker|ServiceClass|Api)\.ts$/, names: ['registerService'],
    }),
    idiom({
        id: 'api-call-call', space: 'api-call', role: 'dispatch', argIndex: 0,
        realm: 'server', form: '1a', keyResolution: 'ns-reflection',
        file: /(^|\/)(LocalBroker|proxify|Api)\.ts$/, names: ['call'],
    }),

    // Form 1b: the key is an object PROPERTY NAME, not an argument. Implemented in its own task.
    idiom({
        id: 'meteor-methods-register', space: 'meteor-methods', role: 'register', argIndex: 0,
        realm: 'server', form: '1b', keyResolution: 'literal-union',
        file: /(^|\/)meteor\.d\.ts$/, names: ['methods'],
    }),
    idiom({
        id: 'meteor-methods-call', space: 'meteor-methods', role: 'dispatch', argIndex: 0,
        realm: 'client', form: '1a', keyResolution: 'literal-union',
        file: /(^|\/)meteor\.d\.ts$/, names: ['call'],
    }),

    // Out of scope (spec §2.2): kept because it already works and costs nothing, never counted.
    idiom({
        id: 'slash-commands', space: 'slash-commands', role: 'register', argIndex: 0,
        realm: 'server', form: '1a', keyResolution: 'literal-union', scope: 'out',
        file: /(^|\/)slashCommand\.ts$/, names: ['add'],
    }),
];

const IN_SCOPE: Space[] = ['callbacks', 'service-events', 'rest', 'streamer', 'api-call', 'meteor-methods'];

// Cheap syntactic gate, derived from the table itself — never a second hand-written list.
//
// It may only SKIP, never DECIDE. A call whose written name is not one any idiom accepts cannot
// possibly be a registry call, so it is dropped without touching the checker; everything that
// survives is still resolved and judged by its declaration. `this.callbacks.add(...)` writes `add`
// and passes; an unrelated class's `add` also passes and is then rejected on its declaration. So
// precision is unchanged and only work is saved.
//
// This matters because resolving every call expression in apps/meteor (4665 files) ran past five
// minutes, against 32 seconds for the same package with no slot extraction: the overwhelming
// majority of call sites are `arr.map()` and friends that no idiom could ever accept.
const NAME_PREFILTER: ReadonlySet<string> = new Set(IDIOMS.flatMap(i => i.names));

// The written name of a callee, with no checker involvement.
function writtenName(callee: Node): string | null {
    if (Node.isPropertyAccessExpression(callee)) return callee.getName();
    if (Node.isIdentifier(callee)) return callee.getText();
    return null;
}

// One declaration per symbol, always the first in source order.
//
// Overloads make this necessary rather than cosmetic: the real Callbacks declares `add` four times
// (three signatures plus the implementation) and `run` four times, and getDeclarations() returns
// all of them in an order the caller should not depend on. Keying a slot on whichever one came
// back splits one registry into four. The first declaration also keeps the id free of the `~n`
// ordinal suffix, and adding an overload later does not renumber it.
function canonicalDecl(node: Node, repoRoot: string): { decl: Node; defId: string } | null {
    let symbol;
    try { symbol = node.getSymbol(); } catch { return null; }
    if (!symbol) return null;
    let target = symbol;
    try { target = symbol.getAliasedSymbol() ?? symbol; } catch { /* not an alias */ }

    const usable = target.getDeclarations().filter(d => defIdOfDeclaration(d, repoRoot) !== null);
    if (usable.length === 0) return null;

    // Positions are only comparable within one file, and a symbol can be declared in several —
    // `Meteor.methods` resolves to both @types/meteor and the repo's own augmentation. Prefer a
    // declaration the repo owns, then the earliest in that file.
    const own = usable.filter(d => !d.getSourceFile().getFilePath().includes('/node_modules/'));
    const decls = (own.length > 0 ? own : usable).sort((a, b) => a.getStart() - b.getStart());

    const decl = decls[0];
    const defId = defIdOfDeclaration(decl, repoRoot)!;
    return { decl, defId };
}

// Name of the type behind an expression, if the checker can give one.
function typeNameOf(node: Node): string | null {
    try {
        const sym = node.getType().getSymbol() ?? node.getType().getAliasSymbol();
        return sym?.getName() ?? null;
    } catch { return null; }
}

function idiomByType(callee: Node): Idiom | undefined {
    const name = typeNameOf(callee);
    if (name === null) return undefined;
    return IDIOMS.find(i => i.byType?.includes(name));
}

function idiomFor(decl: Node, defId: string, repoRoot: string): Idiom | undefined {
    const file = relFileOf(decl.getSourceFile().getFilePath(), repoRoot);
    const qualifiedName = defId.slice(defId.indexOf('#') + 1).replace(/~\d+$/, '');
    return IDIOMS.find(i => i.match({ file, qualifiedName }));
}

// A handler argument is what makes a slot a REGISTRATION rather than a dispatch: `add(key, fn)`
// versus `run(key)`. An inline arrow has no declaration of its own to point at, so it contributes
// the enclosing def — the registration exists, it is just anonymous.
function handlerOf(args: Node[], keyIndex: number, repoRoot: string, at: string): string | undefined {
    for (let i = 0; i < args.length; i++) {
        if (i === keyIndex) continue;
        const a = args[i];
        if (Node.isArrowFunction(a) || Node.isFunctionExpression(a)) return at;
        if (Node.isIdentifier(a) || Node.isPropertyAccessExpression(a)) {
            const target = Node.isPropertyAccessExpression(a) ? a.getNameNode() : a;
            const bind = bindReference(target, repoRoot);
            if (bind.kind === 'def') return bind.defId;
        }
    }
    return undefined;
}

const literalOf = (n: Node | undefined): string | null =>
    n && (Node.isStringLiteral(n) || Node.isNoSubstitutionTemplateLiteral(n)) ? n.getLiteralValue() : null;

export function extractSlots(sf: SourceFile, opts: ExtractOpts): { slots: Slot[]; unbound: Unbound[] } {
    const { repoRoot, keyspaceScope, variant = 'monolith' } = opts;
    const slots: Slot[] = [];
    const unbound: Unbound[] = [];
    const { ranges } = collectDefs(sf, repoRoot);

    const emit = (i: Idiom, key: string, at: string, decl: string, handler?: string): void => {
        slots.push({
            space: i.space, role: i.role, decl, argIndex: i.argIndex,
            key: i.normalizeKey ? i.normalizeKey(key) : key,
            at, ...(handler ? { handler } : {}),
            realm: i.realm, form: i.form, keyResolution: i.keyResolution,
            keyspaceScope, evidence: 'static',
            ...(i.space === 'api-call' ? { variant } : {}),
            ...(i.scope ? { scope: i.scope } : {}),
        });
    };

    sf.forEachDescendant(node => {
        const isNew = Node.isNewExpression(node);
        if (!Node.isCallExpression(node) && !isNew) return;
        const at = enclosingDefId(node.getStart(), ranges);
        if (at === null) return;

        const callee = (node as any).getExpression?.();
        if (!callee) return;

        const written = writtenName(callee);
        if (written === null || !NAME_PREFILTER.has(written)) return;

        const nameNode = Node.isPropertyAccessExpression(callee) ? callee.getNameNode() : callee;
        const canonical = canonicalDecl(nameNode, repoRoot);

        // Declaration identity first; type identity only where the declaration cannot carry it.
        const i = canonical
            ? idiomFor(canonical.decl, canonical.defId, repoRoot)
            : idiomByType(callee);
        if (!i) return;
        const declId = canonical?.defId ?? `${relFileOf(sf.getFilePath(), repoRoot)}#${i.id}`;
        // `new Streamer(...)` is form 1c and only that; a plain call to something matching a 1c
        // idiom is not a registration.
        if (isNew !== (i.form === '1c')) return;

        const args: Node[] = (node as any).getArguments?.() ?? [];
        const arg = args[i.argIndex];

        // Form 1b: `Meteor.methods({ 'rooms.get'() {} })`. The key is a PROPERTY NAME, so the
        // argIndex-based path below produces nothing at all for this trunk.
        if (i.form === '1b') {
            const obj = args[i.argIndex];
            if (!obj || !Node.isObjectLiteralExpression(obj)) return;
            for (const prop of obj.getProperties()) {
                const nameNode = (prop as any).getNameNode?.();
                if (nameNode && Node.isComputedPropertyName(nameNode)) {
                    unbound.push({ at, text: prop.getText().slice(0, 120), reason: 'non-literal-key' });
                    continue;
                }
                const key = nameNode && Node.isStringLiteral(nameNode)
                    ? nameNode.getLiteralValue()
                    : (prop as any).getName?.();
                if (typeof key !== 'string' || key.length === 0) continue;
                emit(i, key, at, canonical!.defId, defIdOfDeclaration(prop, repoRoot) ?? at);
            }
            return;
        }
        // Form 1d: `api.registerService(new AuthorizationService())` carries no key at all.
        // LocalBroker reflects over the instance prototype at runtime and stores one entry per
        // method as `${ns}.${method}`; the keys exist only if that reflection is replayed here.
        //
        // This is the one trunk with nothing to check the result against — no type union, no
        // independent source. Its counts are reported on their own and never folded into a figure
        // shared with the other five.
        if (i.form === '1d') {
            const instance = args[0];
            if (!instance || !Node.isNewExpression(instance)) return;
            const cls = canonicalDecl(instance.getExpression(), repoRoot);
            if (!cls || !Node.isClassDeclaration(cls.decl)) return;

            // The namespace is the class's own `name` initializer. Inherited or computed names are
            // not guessed: no literal, no keys.
            const nameProp = cls.decl.getProperty('name');
            const ns = literalOf(nameProp?.getInitializer());
            if (ns === null) return;

            for (const m of cls.decl.getMethods()) {
                if (m.hasModifier(SyntaxKind.PrivateKeyword) || m.hasModifier(SyntaxKind.ProtectedKeyword)) continue;
                const method = m.getName();
                if (!method || method === 'constructor') continue;
                emit(i, `${ns}.${method}`, at, cls.defId, defIdOfDeclaration(m, repoRoot) ?? at);
            }
            return;
        }

        const key = literalOf(arg);
        if (key === null) {
            if (arg && (Node.isTemplateExpression(arg) || Node.isBinaryExpression(arg))) {
                unbound.push({ at, text: arg.getText().slice(0, 120), reason: 'non-literal-key' });
            }
            return;
        }
        emit(i, key, at, declId,
            i.role === 'register' ? handlerOf(args, i.argIndex, repoRoot, at) : undefined);
    });

    return { slots, unbound };
}

// The only automatic check on the dynamic side, and not a metric: a broken idiom and a working one
// look identical in the logs. Precedent — a guessed class name matched 0 rows and everything
// downstream stayed green for weeks.
export function selfCheckIdioms(slots: Slot[], opts: { throwOnZero?: boolean } = {}): SelfCheckRow[] {
    const { throwOnZero = true } = opts;
    const rows: SelfCheckRow[] = [];

    for (const space of IN_SCOPE) {
        const mine = slots.filter(s => s.space === space && s.scope !== 'out');
        const registerKeys = new Set(mine.filter(s => s.role === 'register').map(s => s.key));
        const dispatchKeys = new Set(mine.filter(s => s.role === 'dispatch').map(s => s.key));
        const keys = new Set([...registerKeys, ...dispatchKeys]);
        rows.push({
            space,
            keys: keys.size,
            registerSites: mine.filter(s => s.role === 'register').length,
            dispatchSites: mine.filter(s => s.role === 'dispatch').length,
            bothSidesKeys: [...keys].filter(k => registerKeys.has(k) && dispatchKeys.has(k)).length,
        });
    }

    if (throwOnZero) {
        const dead = rows.filter(r => r.keys === 0).map(r => r.space);
        if (dead.length > 0) {
            throw new Error(
                `dispatch idiom produced 0 keys for: ${dead.join(', ')}\n` +
                `An idiom that matches nothing is indistinguishable from one that works. ` +
                `Check the declaration anchors in IDIOMS against the target repo.`);
        }
    }
    return rows;
}
