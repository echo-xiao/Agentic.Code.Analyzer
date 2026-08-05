import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attribute } from '../../src/pipeline/attribution.js';
import type { QuestionTrace } from '../../src/pipeline/types.js';

const base: QuestionTrace = {
    qid: 'q', question: 'q',
    routing: { sections: [], promptTokens: 0 },
    seeds: [{ symbol: 's', file: 'core.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: null }],
    chains: [], skeleton: [], pathsRaw: '', selectedIds: ['1a'], droppedIds: [],
    reading: { materials: [{ nodeId: '1a', file: 'core.ts', startLine: 1, endLine: 9, tokens: 1 }], evicted: [] },
    llm: { calls: 3, promptTokensEst: 0 },
};

test('attribute: hit when a core file reaches materials', () => {
    assert.deepEqual(attribute(base, ['core.ts']), { stage: 'hit', missing: [] });
});

test('attribute: routing loss when core file never appears in seeds', () => {
    const r = attribute(base, ['other.ts']);
    assert.equal(r.stage, 'routing');
    assert.deepEqual(r.missing, ['other.ts']);
});

test('attribute: graph loss when core file is a seed but skeleton never covers it', () => {
    const trace: QuestionTrace = {
        ...base,
        seeds: [{ symbol: 's', file: 'core.ts', rrf: 1, signals: { lexicalRank: 1, provenanceRank: null, graphRank: null }, sectionId: null }],
        skeleton: [{ chainId: 1, majorCount: 1, nodeCount: 1, files: ['other.ts'] }],
        reading: { materials: [], evicted: [] },
    };
    const r = attribute(trace, ['core.ts']);
    assert.equal(r.stage, 'graph');
    assert.deepEqual(r.missing, ['core.ts']);
});

test('attribute: paths loss when core file is in skeleton but not selected/materials, no eviction', () => {
    const trace: QuestionTrace = {
        ...base,
        skeleton: [{ chainId: 1, majorCount: 1, nodeCount: 1, files: ['core.ts'] }],
        reading: { materials: [], evicted: [] },
    };
    const r = attribute(trace, ['core.ts']);
    assert.equal(r.stage, 'paths');
    assert.deepEqual(r.missing, ['core.ts']);
});

test('attribute: budget loss when core file is in skeleton but not selected/materials, with eviction', () => {
    const trace: QuestionTrace = {
        ...base,
        skeleton: [{ chainId: 1, majorCount: 1, nodeCount: 1, files: ['core.ts'] }],
        reading: { materials: [], evicted: ['core.ts'] },
    };
    const r = attribute(trace, ['core.ts']);
    assert.equal(r.stage, 'budget');
    assert.deepEqual(r.missing, ['core.ts']);
});
