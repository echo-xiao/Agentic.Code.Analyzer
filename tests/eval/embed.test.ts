import { test } from 'node:test';
import assert from 'node:assert/strict';

test('embed: textForSummary takes ranking_line', async () => {
  const m = await import('../../src/eval/embed.js');
  assert.equal(m.textForSummary({ ranking_line: 'sendMessage · messaging' } as any), 'sendMessage · messaging');
});
