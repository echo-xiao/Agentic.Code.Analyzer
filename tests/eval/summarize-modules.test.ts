// src/eval/summarize-modules.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
test('summarize-modules exports summarizeModules', async () => {
  const m = await import('../../src/eval/summarize-modules.js');
  assert.equal(typeof m.summarizeModules, 'function');
});
