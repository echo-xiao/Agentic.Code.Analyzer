import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attribute } from '../../src/pipeline/attribution.js';
import type { QuestionTrace } from '../../src/pipeline/types.js';

const base: QuestionTrace = {
    qid: 'q', question: 'q',
    routing: { sections: [], promptTokens: 0 },
    seeds: [{ symbol: 's', file: 'core.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: null }],
    chains: [], skeleton: [], pathsRaw: '', selectedIds: ['1a'], droppedIds: [],
    reading: { materials: [{ nodeId: '1a', file: 'core.ts', startLine: 1, endLine: 9, tokens: 1 }], evicted: [], evictedFiles: [], backfilled: [] },
    llm: { calls: 3, promptTokensEst: 0 },
};

test('attribute: hit when a core file reaches materials', () => {
    assert.deepEqual(attribute(base, ['core.ts']), { stage: 'hit', missing: [], perFile: [{ file: 'core.ts', stage: 'hit' }] });
});

test('attribute: routing loss when core file never appears in seeds', () => {
    const r = attribute(base, ['other.ts']);
    assert.equal(r.stage, 'routing');
    assert.deepEqual(r.missing, ['other.ts']);
    assert.deepEqual(r.perFile, [{ file: 'other.ts', stage: 'routing' }]);
});

test('attribute: graph loss when core file is a seed but skeleton never covers it', () => {
    const trace: QuestionTrace = {
        ...base,
        seeds: [{ symbol: 's', file: 'core.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: null }],
        skeleton: [{ chainId: 1, majorCount: 1, nodeCount: 1, files: ['other.ts'] }],
        reading: { materials: [], evicted: [], evictedFiles: [], backfilled: [] },
    };
    const r = attribute(trace, ['core.ts']);
    assert.equal(r.stage, 'graph');
    assert.deepEqual(r.missing, ['core.ts']);
    assert.deepEqual(r.perFile, [{ file: 'core.ts', stage: 'graph' }]);
});

test('attribute: paths loss when core file is in skeleton but not selected/materials, no eviction', () => {
    const trace: QuestionTrace = {
        ...base,
        skeleton: [{ chainId: 1, majorCount: 1, nodeCount: 1, files: ['core.ts'] }],
        reading: { materials: [], evicted: [], evictedFiles: [], backfilled: [] },
    };
    const r = attribute(trace, ['core.ts']);
    assert.equal(r.stage, 'paths');
    assert.deepEqual(r.missing, ['core.ts']);
    assert.deepEqual(r.perFile, [{ file: 'core.ts', stage: 'paths' }]);
});

test('attribute: budget loss when core file is in skeleton but not selected/materials, and its file was evicted', () => {
    const trace: QuestionTrace = {
        ...base,
        skeleton: [{ chainId: 1, majorCount: 1, nodeCount: 1, files: ['core.ts'] }],
        reading: { materials: [], evicted: ['1a'], evictedFiles: ['core.ts'], backfilled: [] },
    };
    const r = attribute(trace, ['core.ts']);
    assert.equal(r.stage, 'budget');
    assert.deepEqual(r.missing, ['core.ts']);
    assert.deepEqual(r.perFile, [{ file: 'core.ts', stage: 'budget' }]);
});

test('attribute: paths (not budget) when core file was not selected and an unrelated node was evicted', () => {
    const trace: QuestionTrace = {
        ...base,
        skeleton: [{ chainId: 1, majorCount: 1, nodeCount: 1, files: ['core.ts'] }],
        reading: { materials: [], evicted: ['2b'], evictedFiles: ['unrelated.ts'], backfilled: [] },
    };
    const r = attribute(trace, ['core.ts']);
    assert.equal(r.stage, 'paths');
    assert.deepEqual(r.missing, ['core.ts']);
    assert.deepEqual(r.perFile, [{ file: 'core.ts', stage: 'paths' }]);
});

test('attribute: opts-less call (no wikiReachable) behaves exactly as before — no wiki-gap possible', () => {
    // 'other.ts' is absent from seeds/skeleton/materials entirely, which would be a wiki-gap
    // candidate if a wikiReachable set were supplied and excluded it. Without opts, it must
    // still resolve through the ordinary pipeline stages (here: routing), never 'wiki-gap'.
    const r = attribute(base, ['other.ts']);
    assert.equal(r.stage, 'routing');
    assert.deepEqual(r.perFile, [{ file: 'other.ts', stage: 'routing' }]);
});

test('attribute: wiki-gap when core file is absent from wikiReachable, even if also absent from seeds', () => {
    const r = attribute(base, ['other.ts'], { wikiReachable: new Set(['core.ts']) });
    assert.equal(r.stage, 'wiki-gap');
    assert.deepEqual(r.missing, ['other.ts']);
    assert.deepEqual(r.perFile, [{ file: 'other.ts', stage: 'wiki-gap' }]);
});

test('attribute: mixed wiki-gap + paths loss — headline is the worst NON-wiki-gap stage', () => {
    const trace: QuestionTrace = {
        ...base,
        skeleton: [{ chainId: 1, majorCount: 1, nodeCount: 1, files: ['paths.ts'] }],
        reading: { materials: [], evicted: [], evictedFiles: [], backfilled: [] },
    };
    // 'gap.ts' is unreachable in the wiki at all; 'paths.ts' is reachable but lost at the paths stage.
    const r = attribute(trace, ['gap.ts', 'paths.ts'], { wikiReachable: new Set(['paths.ts']) });
    assert.equal(r.stage, 'paths');
    assert.deepEqual(new Set(r.missing), new Set(['gap.ts', 'paths.ts']));
    assert.deepEqual(r.perFile, [
        { file: 'gap.ts', stage: 'wiki-gap' },
        { file: 'paths.ts', stage: 'paths' },
    ]);
});

test('attribute: headline is wiki-gap when every core file is unreachable in the wiki', () => {
    const r = attribute(base, ['gap1.ts', 'gap2.ts'], { wikiReachable: new Set(['core.ts']) });
    assert.equal(r.stage, 'wiki-gap');
    assert.deepEqual(new Set(r.missing), new Set(['gap1.ts', 'gap2.ts']));
    assert.deepEqual(r.perFile, [
        { file: 'gap1.ts', stage: 'wiki-gap' },
        { file: 'gap2.ts', stage: 'wiki-gap' },
    ]);
});
