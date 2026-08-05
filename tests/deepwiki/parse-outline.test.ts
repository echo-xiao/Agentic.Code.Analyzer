import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSectionHtml } from '../../src/deepwiki/parse-outline.js';

test('parseSectionHtml extracts github blob refs with line ranges, deduped', () => {
    const html = `
      <a href="https://github.com/RocketChat/Rocket.Chat/blob/e75965c0/package.json#L17-L23">package.json17-23</a>
      <a href="https://github.com/RocketChat/Rocket.Chat/blob/e75965c0/apps/meteor/app/lib/server/functions/sendMessage.ts#L40-L120">sendMessage.ts40-120</a>
      <a href="https://github.com/RocketChat/Rocket.Chat/blob/e75965c0/package.json#L17-L23">dup</a>
      <a href="https://github.com/RocketChat/Rocket.Chat/blob/e75965c0/HISTORY.md?plain=1#L5-L9">HISTORY.md5-9</a>`;
    const { sources } = parseSectionHtml(html);
    assert.equal(sources.length, 3);
    assert.deepEqual(sources[0], { file: 'package.json', startLine: 17, endLine: 23 });
    assert.deepEqual(sources[1], { file: 'apps/meteor/app/lib/server/functions/sendMessage.ts', startLine: 40, endLine: 120 });
    assert.deepEqual(sources[2], { file: 'HISTORY.md', startLine: 5, endLine: 9 });
});
