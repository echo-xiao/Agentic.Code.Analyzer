import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { GLOBAL_INDEX } from '../../src/indexer/state.js';
import {
    buildChainSkeleton, renderSkeletons, anchorSeg, anchorOf, isDispatchKey,
    isTestPath, downstreamCandidates, upstreamCandidates, buildFileAwareCalleesOf,
    resetSkeletonCaches, looksLikeDispatchKey, letterId,
} from '../../src/pipeline/skeleton.js';
import type { Chain, SkeletonNode } from '../../src/pipeline/types.js';

// Real files on disk: anchorOf reads them, so the fixtures must exist.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'skel-'));
const write = (rel: string, body: string): string => {
    const abs = path.join(tmp, 'Rocket.Chat', rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, body);
    return abs;
};
const def = (sym: string, abs: string) => {
    if (!GLOBAL_INDEX.symbols.has(sym)) GLOBAL_INDEX.symbols.set(sym, new Set());
    GLOBAL_INDEX.symbols.get(sym)!.add(abs);
};
const edge = (callee: string, caller: string, file: string, edgeType: any = 'call') => {
    if (!GLOBAL_INDEX.callGraph.has(callee)) GLOBAL_INDEX.callGraph.set(callee, []);
    GLOBAL_INDEX.callGraph.get(callee)!.push({ caller, file, edgeType });
};
const chainOf = (symbol: string, file: string): Chain =>
    ({ id: 1, pageId: 'p', sections: ['p › S'], label: 'p › S · ' + symbol, seed: { symbol, file }, tied: false, prose: '' });

beforeEach(() => {
    GLOBAL_INDEX.symbols.clear(); GLOBAL_INDEX.callGraph.clear(); GLOBAL_INDEX.fileDependents.clear();
    resetSkeletonCaches();
});

const walk = (n: SkeletonNode, out: SkeletonNode[] = []): SkeletonNode[] => {
    out.push(n); n.children.forEach(c => walk(c, out)); return out;
};

// Package granularity, not directory-segment: two server-side files inside apps/meteor are the
// same subsystem even when they sit under different top-level folders.
test('anchorSeg identifies the package, so intra-package hops are not boundaries', () => {
    assert.equal(anchorSeg('apps/meteor/app/lib/server/a.ts'), 'apps/meteor');
    assert.equal(anchorSeg('apps/meteor/server/services/messages/service.ts'), 'apps/meteor');
    assert.equal(anchorSeg('packages/rest-typings/src/x.ts'), 'packages/rest-typings');
    assert.equal(anchorSeg('ee/packages/federation-matrix/src/x.ts'), 'ee/packages/federation-matrix');
    // still distinct from each other
    assert.notEqual(anchorSeg('apps/meteor/x.ts'), anchorSeg('packages/models/x.ts'));
});

test('isTestPath catches every test-shaped location the skeleton must skip', () => {
    ['a/x.test.ts', 'a/x.spec.tsx', 'apps/meteor/tests/unit/x.ts', 'a/__tests__/x.ts', 'a/x.mocks.ts']
        .forEach(p => assert.ok(isTestPath(p), p));
    assert.ok(!isTestPath('apps/meteor/client/lib/latest.ts'));
});

// Substring matching anchors on imports, and makes `MessageAction` land on the line that
// declares `MessageActionProps` -- two nodes pointing at one location, read twice.
test('anchorOf prefers a definition line over any earlier mention of the name', () => {
    const abs = write('a/def.ts', [
        "import { sendMessage } from './other';",
        'const unrelated = 1;',
        'export const sendMessage = async () => {};',
    ].join('\n'));
    const a = anchorOf('sendMessage', abs);
    assert.equal(a.line, 3);
    assert.ok(a.snippet.startsWith('export const sendMessage'));
    assert.equal(a.isType, false);
});

test('anchorOf: `MessageAction` does not steal the line declaring `MessageActionProps`', () => {
    const abs = write('a/props.tsx', [
        'export type MessageActionProps = {',
        '  id: string;',
        '};',
        'export const MessageAction = () => null;',
    ].join('\n'));
    assert.equal(anchorOf('MessageActionProps', abs).line, 1);
    assert.equal(anchorOf('MessageAction', abs).line, 4);
});

test('anchorOf flags type declarations so they can be demoted to leaves', () => {
    const abs = write('a/t.ts', 'export type Foo = { a: 1 };');
    assert.equal(anchorOf('Foo', abs).isType, true);
});

test('downstreamCandidates keeps only edges whose call site is this node\'s own file', () => {
    const clientAbs = write('client/send.ts', 'export const sendMessage = () => {};');
    const serverAbs = write('server/send.ts', 'export const sendMessage = () => {};');
    def('sendMessage', clientAbs); def('sendMessage', serverAbs);
    def('composeMessage', clientAbs); def('validateMessage', serverAbs);
    edge('composeMessage', 'sendMessage', clientAbs);
    edge('validateMessage', 'sendMessage', serverAbs);

    const cands = downstreamCandidates('sendMessage', clientAbs, buildFileAwareCalleesOf());
    assert.deepEqual(cands.map(c => c.symbol), ['composeMessage']);
    assert.equal(cands[0].direction, 'down');
});

test('upstreamCandidates prunes static edges to callers that import the definition file', () => {
    const defAbs = write('lib/target.ts', 'export const target = () => {};');
    const importerAbs = write('lib/importer.ts', 'export const importer = () => {};');
    const strangerAbs = write('lib/stranger.ts', 'export const stranger = () => {};');
    def('target', defAbs); def('importer', importerAbs); def('stranger', strangerAbs);
    edge('target', 'importer', importerAbs, 'call');
    edge('target', 'stranger', strangerAbs, 'call');
    GLOBAL_INDEX.fileDependents.set(defAbs, new Set([importerAbs]));

    assert.deepEqual(upstreamCandidates('target').map(c => c.symbol), ['importer']);
});

test('upstreamCandidates keeps string-dispatch edges unpruned — they carry no import relation', () => {
    const defAbs = write('lib/handler.ts', 'export const handler = () => {};');
    const emitAbs = write('other/emit.ts', 'export const emitter = () => {};');
    def('handler', defAbs); def('emitter', emitAbs);
    edge('handler', 'emitter', emitAbs, 'event_emit');
    assert.deepEqual(upstreamCandidates('handler').map(c => c.symbol), ['emitter']);
});

// The indexer stores dispatch keys as ordinary callGraph keys that are not real symbols; the old
// `symbols.has(callee)` guard therefore discarded 77.7% of all string-dispatch edges.
test('a dispatch key survives as a pseudo-node carrying its sibling group', () => {
    const emitAbs = write('lib/save.ts', 'export const saveMessage = () => {};');
    const otrAbs = write('otr/hooks.ts', 'export const otrHook = () => {};');
    const transAbs = write('trans/hooks.ts', 'export const transHook = () => {};');
    def('saveMessage', emitAbs); def('otrHook', otrAbs); def('transHook', transAbs);
    edge('afterSaveMessage', 'saveMessage', emitAbs, 'event_emit');
    edge('afterSaveMessage', 'otrHook', otrAbs, 'event_listen');
    edge('afterSaveMessage', 'transHook', transAbs, 'event_listen');

    assert.ok(isDispatchKey('afterSaveMessage'));
    assert.ok(!isDispatchKey('saveMessage'));

    const sk = buildChainSkeleton(chainOf('saveMessage', 'lib/save.ts'), {}, 'how is a message saved');
    const dispatch = walk(sk.roots[0]).find(n => n.kind === 'dispatch');
    assert.ok(dispatch, 'dispatch pseudo-node reached');
    assert.equal(dispatch!.symbol, 'afterSaveMessage');
    assert.equal(dispatch!.file, '');                                  // no definition site
    assert.equal(dispatch!.children.length, 0);                        // never recursed
    assert.ok(dispatch!.siblings!.total >= 2);
    assert.ok(dispatch!.siblings!.refs.some(r => r.symbol === 'otrHook'));
});

test('dispatch pseudo-nodes are not counted as major nodes', () => {
    const abs = write('lib/emit.ts', 'export const emitter = () => {};');
    def('emitter', abs);
    edge('someEvent', 'emitter', abs, 'event_emit');
    const sk = buildChainSkeleton(chainOf('emitter', 'lib/emit.ts'), {}, 'q');
    assert.equal(sk.majorCount, 1);                                    // just the root
});

test('a cross-subsystem callee becomes a boundary leaf and keeps its file:line', () => {
    const homeAbs = write('apps/meteor/app/lib/server/home.ts', 'export const home = () => {};');
    const farAbs = write('packages/models/src/models/Far.ts', 'export const far = () => {};');   // different package
    def('home', homeAbs); def('far', farAbs);
    edge('far', 'home', homeAbs);
    const sk = buildChainSkeleton(chainOf('home', 'apps/meteor/app/lib/server/home.ts'), {}, 'q');
    const b = walk(sk.roots[0]).find(n => n.kind === 'boundary');
    assert.ok(b && b.file.includes('packages/models') && b.line > 0);
});

test('a type declaration becomes a type leaf instead of a major node', () => {
    const abs = write('apps/meteor/app/lib/server/mix.ts', [
        'export const holder = () => {};',
        'export type Payload = { a: 1 };',
    ].join('\n'));
    def('holder', abs); def('Payload', abs);
    edge('Payload', 'holder', abs, 'type');
    const sk = buildChainSkeleton(chainOf('holder', 'apps/meteor/app/lib/server/mix.ts'), {}, 'q');
    const t = walk(sk.roots[0]).find(n => n.symbol === 'Payload');
    assert.equal(t?.kind, 'type');
    assert.equal(sk.majorCount, 1);
});

test('test-file callees never enter the skeleton', () => {
    const abs = write('apps/meteor/app/lib/server/real.ts', 'export const real = () => {};');
    const testAbs = write('apps/meteor/tests/unit/helper.ts', 'export const helper = () => {};');
    def('real', abs); def('helper', testAbs);
    edge('helper', 'real', abs);
    const sk = buildChainSkeleton(chainOf('real', 'apps/meteor/app/lib/server/real.ts'), {}, 'q');
    assert.ok(!walk(sk.roots[0]).some(n => n.symbol === 'helper'));
});

// Blast-radius entries have little or nothing downstream and plenty upstream, so the direction
// falls out of the data without reading intent from the question text.
test('a symbol with only callers becomes an impact chain; one with callees stays a flow chain', () => {
    const hubAbs = write('apps/meteor/app/lib/server/hub.ts', 'export const hub = () => {};');
    const userAbs = write('apps/meteor/app/lib/server/user.ts', 'export const user = () => {};');
    def('hub', hubAbs); def('user', userAbs);
    edge('hub', 'user', userAbs, 'call');
    GLOBAL_INDEX.fileDependents.set(hubAbs, new Set([userAbs]));
    assert.equal(buildChainSkeleton(chainOf('hub', 'apps/meteor/app/lib/server/hub.ts'), {}, 'q').mode, 'impact');

    resetSkeletonCaches();
    const leafAbs = write('apps/meteor/app/lib/server/leaf.ts', 'export const leaf = () => {};');
    def('leaf', leafAbs);
    edge('leaf', 'hub', hubAbs, 'call');
    assert.equal(buildChainSkeleton(chainOf('hub', 'apps/meteor/app/lib/server/hub.ts'), {}, 'q').mode, 'flow');
});

test('renderSkeletons labels the chain mode, marks edge direction, and ids majors in reading order', () => {
    const abs = write('apps/meteor/app/lib/server/r.ts', [
        'export const root = () => {};',
        'export const childFn = () => {};',
    ].join('\n'));
    def('root', abs); def('childFn', abs);
    edge('childFn', 'root', abs);
    const sk = buildChainSkeleton(chainOf('root', 'apps/meteor/app/lib/server/r.ts'), {}, 'q');
    const { text, nodeById } = renderSkeletons([sk]);
    assert.ok(text.includes('flow ↓ 1 (p › S · root)'));
    assert.ok(text.includes('[1a] ↓ root'));
    assert.deepEqual([...nodeById.keys()], ['1a', '1b']);
});

test('maxDepthReached is recorded so maxDepth can be judged against real data', () => {
    const abs = write('apps/meteor/app/lib/server/chain.ts',
        ['a', 'b', 'c'].map(n => `export const ${n} = () => {};`).join('\n'));
    def('a', abs); def('b', abs); def('c', abs);
    edge('b', 'a', abs); edge('c', 'b', abs);
    const sk = buildChainSkeleton(chainOf('a', 'apps/meteor/app/lib/server/chain.ts'), {}, 'q');
    assert.equal(sk.maxDepthReached, 2);
});

// The extractor cannot tell `callbacks.add('afterSaveMessage', …)` from `new Promise(resolve => …)`:
// both look like a string-keyed call. Measured noise: `resolve` carried three unrelated members
// (ready@agenda, finish@processDataDownloads, PAUSED@e2e.room.ts) and `cb` appeared 36 times.
test('looksLikeDispatchKey keeps event/route shaped names and drops callback parameter names', () => {
    ['afterSaveMessage', 'notify.ephemeralMessage', 'unread-state-change', 'user.roleUpdate', 'error:database']
        .forEach(k => assert.ok(looksLikeDispatchKey(k), k));
    ['resolve', 'cb', 'done', 'PAUSED'].forEach(k => assert.ok(!looksLikeDispatchKey(k), k));
});

test('a callback-shaped key never becomes a dispatch pseudo-node', () => {
    const abs = write('apps/meteor/app/lib/server/p.ts', 'export const producer = () => {};');
    def('producer', abs);
    edge('resolve', 'producer', abs, 'event_emit');
    const sk = buildChainSkeleton(chainOf('producer', 'apps/meteor/app/lib/server/p.ts'), {}, 'q');
    assert.ok(!walk(sk.roots[0]).some(n => n.kind === 'dispatch'));
});

// The candidate-level filter only drops symbols defined EXCLUSIVELY under test paths, so a symbol
// with both a production and a test definition survives it -- and then must not be anchored on
// the fixture. Measured: `updateMessage @ packages/apps-engine/tests/.../livechatBridge.ts:0`.
test('a symbol defined in both production and test files anchors on the production one', () => {
    const home = write('apps/meteor/app/lib/server/home2.ts', 'export const home2 = () => {};');
    const testDef = write('apps/meteor/tests/data/dual.ts', 'export const dual = () => {};');
    const prodDef = write('apps/meteor/app/lib/server/dual.ts', 'export const dual = () => {};');
    def('home2', home); def('dual', testDef); def('dual', prodDef);
    edge('dual', 'home2', home);
    const sk = buildChainSkeleton(chainOf('home2', 'apps/meteor/app/lib/server/home2.ts'), {}, 'q');
    const dual = walk(sk.roots[0]).find(n => n.symbol === 'dual');
    assert.ok(dual, 'symbol reached');
    assert.ok(!isTestPath(dual!.file), `anchored on ${dual!.file}`);
    assert.ok(dual!.line > 0);
});

// The section prose describes the flow in words, so a candidate it names is likelier to sit on
// the intended path. Same-shaped candidates must therefore order differently under different prose.
test('wiki prose lifts a candidate it names above an equally-scored one', () => {
    const abs = write('apps/meteor/app/lib/server/fork.ts', [
        'export const forkRoot = () => {};',
        'export const alpha = () => {};',
        'export const beta = () => {};',
    ].join('\n'));
    def('forkRoot', abs); def('alpha', abs); def('beta', abs);
    edge('alpha', 'forkRoot', abs); edge('beta', 'forkRoot', abs);

    const order = (prose?: string) => {
        resetSkeletonCaches();
        const sk = buildChainSkeleton(chainOf('forkRoot', 'apps/meteor/app/lib/server/fork.ts'), { maxChildrenPerNode: 2, prose }, 'q');
        return sk.roots[0].children.map(c => c.symbol);
    };
    assert.deepEqual(order(), ['alpha', 'beta']);                       // tie -> source order
    assert.deepEqual(order('the flow goes through `beta` first.'), ['beta', 'alpha']);
});

// With no major-node cap a single chain reached 81 majors; single-character ids run past 'z' into
// `{` / `|` / `€`, which the model then cites incorrectly.
test('letterId keeps node ids alphabetic past the 26th major', () => {
    assert.equal(letterId(0), 'a');
    assert.equal(letterId(25), 'z');
    assert.equal(letterId(26), 'aa');
    assert.equal(letterId(27), 'ab');
    assert.equal(letterId(51), 'az');
    assert.equal(letterId(52), 'ba');
    for (let i = 0; i < 300; i++) assert.match(letterId(i), /^[a-z]+$/);
});
