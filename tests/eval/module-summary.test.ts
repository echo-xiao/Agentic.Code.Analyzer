import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleModuleInput, buildModulePrompt } from '../../src/eval/module-summary.js';

test('assembleModuleInput: file summaries sorted by fanIn + carry boundary edges', () => {
  const mod = { id: 'livechat', subsystem: 'livechat', files: ['a.ts','b.ts'], edges: [['livechat','messaging',5]] };
  const fs = { 'a.ts': { role: 'queue', fanIn: 2, key_exports: ['QueueManager'], upstream:[], downstream:[] }, 'b.ts': { role: 'route', fanIn: 9, key_exports: ['RoutingManager'], upstream:[], downstream:[] } };
  const inp = assembleModuleInput(mod as any, fs as any, { file_to_module: {} } as any);
  assert.equal(inp.moduleId, 'livechat');
  assert.equal(inp.fileSummaries[0].file, 'b.ts');   // higher fanIn comes first
  assert.deepEqual(inp.boundaryEdges, [['livechat','messaging',5]]);
});

test('assembleModuleInput: rel-path downstream correctly produces internalEdges', () => {
  // Verify that after structural-facts normalizes rel paths, the memberSet intersection hits
  const mod = { id: 'x', subsystem: 'x', files: ['x/a.ts', 'x/b.ts'], edges: [] };
  const fs2 = {
    'x/a.ts': { role: '', fanIn: 1, key_exports: [], downstream: ['x/b.ts'] },
    'x/b.ts': { role: '', fanIn: 0, key_exports: [], downstream: [] },
  };
  const inp = assembleModuleInput(mod as any, fs2 as any, {});
  assert.ok(inp.internalEdges.length > 0, 'internal edges should be > 0; empty means the rel-path intersection did not hit');
  assert.ok(inp.internalEdges.includes('x/b.ts → x/a.ts'), `expected edge 'x/b.ts → x/a.ts', actual: ${JSON.stringify(inp.internalEdges)}`);
});

test('buildModulePrompt: enforces "do not list files individually"', () => {
  const p = buildModulePrompt({ moduleId:'x', subsystem:'x', fileSummaries:[], internalEdges:[], boundaryEdges:[] });
  assert.ok(/do not list/i.test(p));
});
