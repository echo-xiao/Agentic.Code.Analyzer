// src/eval/summarize-modules.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
test('summarize-modules 导出 summarizeModules', async () => {
  const m = await import('./summarize-modules.js');
  assert.equal(typeof m.summarizeModules, 'function');
});
