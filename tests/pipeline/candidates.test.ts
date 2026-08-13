import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { GLOBAL_INDEX, resetGlobalIndex } from '../../src/indexer/state.js';
import { buildCandidates, majorsOf } from '../../src/pipeline/candidates.js';
import { resetSkeletonCaches } from '../../src/pipeline/skeleton.js';
import type { Pool } from '../../src/pipeline/entry.js';
import type { Chain, ChainSkeleton, SkeletonNode } from '../../src/pipeline/types.js';

// anchorOf reads the file to locate a symbol's definition line, so fixtures must exist on disk.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cand-'));
const write = (rel: string, body: string): string => {
    const abs = path.join(tmp, 'Rocket.Chat', rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, body);
    return abs;
};
// The index is keyed by definition, and a Chain's seed carries a repo-relative file, so the
// fixtures build ids the same way the pipeline does: `<file>#<symbol>`.
const rel = (abs: string) => abs.replace(/^.*?Rocket\.Chat\//, '');
const def = (sym: string, abs: string) => {
    const file = rel(abs);
    const id = `${file}#${sym}`;
    GLOBAL_INDEX.defs.set(id, {
        id, file, name: sym, qualifiedName: sym, kind: 'function',
        line: 1, endLine: 5, signature: '', exported: true,
    });
    GLOBAL_INDEX.byName.set(sym, [...(GLOBAL_INDEX.byName.get(sym) ?? []), id]);
    return id;
};
// Direction matches the graph: caller -> callee.
const edge = (callee: string, caller: string, file: string) => {
    const from = `${rel(file)}#${caller}`;
    const to = [...GLOBAL_INDEX.defs.keys()].find(k => k.endsWith(`#${callee}`)) ?? `${rel(file)}#${callee}`;
    const e = { from, to, kind: 'call' as const };
    GLOBAL_INDEX.out.set(from, [...(GLOBAL_INDEX.out.get(from) ?? []), e]);
    GLOBAL_INDEX.in.set(to, [...(GLOBAL_INDEX.in.get(to) ?? []), e]);
};
const chain = (id: number, symbol: string, file: string, score = 1, pageId = 'P'): Chain =>
    ({ id, pageId, sections: [`${pageId} › S`], label: `${pageId} › S · ${symbol}`, seed: { symbol, file }, score, tied: false, prose: '' });
const pool = (pageId: string, files: string[]): Pool => ({ pageId, sections: [], files, symbols: [] });

beforeEach(() => {
    resetGlobalIndex();
    resetSkeletonCaches();
});

// entry -> mid -> {leafA, leafB}, all in one file, so a chain seeded at `mid` expands into a
// strict subset of the one seeded at `entry`. `mid` needs two callees: a node with exactly one
// child is classified passthrough and never becomes a major, which would make the two sets
// disjoint rather than nested.
const nestedChainFixture = () => {
    const rel = 'app/a.ts';
    const abs = write(rel, [
        'export function entry() { return mid(); }',
        'export function mid() { return leafA() + leafB(); }',
        'export function leafA() { return 1; }',
        'export function leafB() { return 2; }',
    ].join('\n'));
    ['entry', 'mid', 'leafA', 'leafB'].forEach(s => def(s, abs));
    edge('mid', 'entry', abs); edge('leafA', 'mid', abs); edge('leafB', 'mid', abs);
    return { rel, abs };
};

const node = (symbol: string, kind: SkeletonNode['kind'], children: SkeletonNode[] = []): SkeletonNode =>
    ({ id: '', symbol, file: 'f.ts', line: 1, snippet: '', kind, direction: 'down', edgeType: null, children });

test('majorsOf collects major nodes only, keyed by symbol and file', () => {
    const sk = { roots: [node('a', 'major', [node('b', 'hotleaf'), node('c', 'major')])] } as unknown as ChainSkeleton;
    assert.deepEqual([...majorsOf(sk)].sort(), ['a@f.ts', 'c@f.ts']);
});

// A seed that is itself a node on a bigger chain's tree expands into a strict subset of it, so it
// carries nothing the bigger chain does not already have. Measured over 34 questions: 26 of 385
// candidates were subsets, on top of 61 exact duplicates.
test('a chain whose majors sit inside another chain is dropped', () => {
    const { rel } = nestedChainFixture();
    const { kept, droppedRedundant } = buildCandidates(
        [chain(1, 'entry', rel), chain(2, 'mid', rel)], [pool('P', [rel])], 'entry mid leaf');
    assert.equal(droppedRedundant, 1);
    assert.deepEqual(kept.map(c => c.chain.seed.symbol), ['entry']);
});

// Redundancy is resolved against the ORIGINAL set: with entry > mid > leafA, dropping `mid`
// because it sits inside `entry` must not then rescue `leafA` on the grounds that `mid` is gone.
test('dropping a middle chain does not rescue the chain nested inside it', () => {
    const { rel } = nestedChainFixture();
    const { kept } = buildCandidates(
        [chain(1, 'entry', rel), chain(2, 'mid', rel), chain(3, 'leafA', rel)], [pool('P', [rel])], 'entry mid leaf');
    assert.deepEqual(kept.map(c => c.chain.seed.symbol), ['entry']);
});

// The empty set is a subset of everything, so an unexpandable chain would be swallowed by any
// other chain -- including on questions where a one-node chain is the only thing that touches the
// answer (new-26's five core chains are all 1-2 majors).
test('a chain that expands to nothing is not swallowed by every other chain', () => {
    const { rel } = nestedChainFixture();
    const lonelyRel = 'app/b.ts';
    def('lonely', write(lonelyRel, 'export const lonely = 1;'));
    const { kept } = buildCandidates(
        [chain(1, 'entry', rel), chain(2, 'lonely', lonelyRel)], [pool('P', [rel, lonelyRel])], 'entry lonely');
    assert.ok(kept.some(c => c.chain.seed.symbol === 'lonely'));
});

test('surviving chains are renumbered 1..n so node ids stay contiguous', () => {
    const { rel } = nestedChainFixture();
    const otherRel = 'app/b.ts';
    def('other', write(otherRel, 'export const other = 1;'));
    const { kept } = buildCandidates(
        [chain(1, 'entry', rel), chain(2, 'mid', rel), chain(3, 'other', otherRel)],
        [pool('P', [rel, otherRel])], 'entry mid other');
    assert.deepEqual(kept.map(c => c.chain.id), kept.map((_, i) => i + 1));
    assert.deepEqual(kept.map(c => c.skeleton.chain.id), kept.map((_, i) => i + 1));
});

// The quota is spent floor-first, so the leading pool cannot starve the others -- measured:
// new-09's four core chains all sit in pools 2, 3 and 4, and plain pool order spends the whole
// quota inside pool 1.
test('every pool keeps its best chain even when another pool outscores it everywhere', () => {
    const pRel = 'app/p.ts', qRel = 'app/q.ts';
    const pAbs = write(pRel, 'export const big1 = 1;\nexport const big2 = 2;\nexport const big3 = 3;');
    ['big1', 'big2', 'big3'].forEach(s => def(s, pAbs));
    def('small', write(qRel, 'export const small = 1;'));
    const chains = [
        chain(1, 'big1', pRel, 9, 'P'), chain(2, 'big2', pRel, 8, 'P'),
        chain(3, 'big3', pRel, 7, 'P'), chain(4, 'small', qRel, 1, 'Q'),
    ];
    const { kept } = buildCandidates(chains, [pool('P', [pRel]), pool('Q', [qRel])], 'big small', 2);
    assert.deepEqual(kept.map(c => c.chain.seed.symbol).sort(), ['big1', 'small']);
});

test('past the floor, remaining slots go to the highest lexical score across pools', () => {
    const pRel = 'app/p.ts', qRel = 'app/q.ts';
    const pAbs = write(pRel, 'export const hi = 1;\nexport const lo = 2;');
    def('hi', pAbs); def('lo', pAbs);
    def('mid2', write(qRel, 'export const mid2 = 1;'));
    const chains = [
        chain(1, 'lo', pRel, 1, 'P'), chain(2, 'hi', pRel, 9, 'P'), chain(3, 'mid2', qRel, 5, 'Q'),
    ];
    const { kept } = buildCandidates(chains, [pool('P', [pRel]), pool('Q', [qRel])], 'hi lo mid2', 3);
    // floor: P's best (hi) and Q's best (mid2); the last slot then goes to lo
    assert.deepEqual(kept.map(c => c.chain.seed.symbol), ['hi', 'mid2', 'lo']);
});

test('redundancy compares definitions, not name-and-file pairs', () => {
    const barrel = write('packages/core-services/src/index.ts',
        'export const Settings = { get(k: string) { return k; } };\nexport const Auth = { check() { return true; } };\n');
    const other = write('apps/meteor/server/settings.ts', 'export function saveSetting() { return 1; }\n');
    def('Settings', barrel);
    def('Auth', barrel);
    def('saveSetting', other);

    const a = { chain: chain(1, 'Settings', rel(barrel)), skeleton: {} as never, majors: new Set(['packages/core-services/src/index.ts#Settings', 'packages/core-services/src/index.ts#Auth']) };
    const b = { chain: chain(2, 'saveSetting', rel(other)), skeleton: {} as never, majors: new Set(['apps/meteor/server/settings.ts#saveSetting']) };

    // Keyed by symbol@file a barrel's chain swallowed unrelated chains whole: new-21 kept a
    // one-node chain and dropped chains of 20 and 10 nodes. Definition ids do not collide that way.
    assert.equal(majorsOf({ roots: [{ kind: 'major', defId: 'x.ts#f', symbol: 'f', file: 'x.ts', children: [] }] } as never).has('x.ts#f'), true);
    assert.equal([...a.majors].every(m => b.majors.has(m)), false);
});
