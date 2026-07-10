import { test } from 'node:test';
import assert from 'node:assert/strict';

test('embed: textForSummary 取 ranking_line', async () => {
  const m = await import('./embed.js');
  assert.equal(m.textForSummary({ ranking_line: 'sendMessage · messaging' } as any), 'sendMessage · messaging');
});
