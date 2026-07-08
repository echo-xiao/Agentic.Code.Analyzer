import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseWikiMarkdown } from './parse.js';

const FIXTURE = `# Page: Overview

# Overview

Some prose that must NOT survive compression.

Sources: [package.json:1-15](), [apps/meteor/server/main.ts:1-45]()

# Page: Notifications

# Notifications

## Push Pipeline

\`\`\`mermaid
graph TB
    PUSH["sendPushNotification<br/>apps/meteor/server/lib/push.ts"]
    QUEUE["NotificationQueue"]

    subgraph "Server Side"
        PUSH
        QUEUE
    end

    PUSH --> QUEUE
    QUEUE -->|"delay"| GATEWAY
\`\`\`

Sources: [apps/meteor/server/lib/push.ts:10-90](), [apps/meteor/server/lib/push.ts:2-6](), [not-a-file]()
`;

test('切页：每个 "# Page:" 一页，标题正确', () => {
    const m = parseWikiMarkdown(FIXTURE, 'RocketChat/Rocket.Chat');
    assert.equal(m.pages.length, 2);
    assert.deepEqual(m.pages.map(p => p.page), ['Overview', 'Notifications']);
});

test('sections 抽取 ## 标题', () => {
    const m = parseWikiMarkdown(FIXTURE, 'RocketChat/Rocket.Chat');
    assert.deepEqual(m.pages[1].sections, ['Push Pipeline']);
});

test('mermaid 节点/边/子图解析，<br/> 换成 " / "', () => {
    const m = parseWikiMarkdown(FIXTURE, 'RocketChat/Rocket.Chat');
    const d = m.pages[1].diagrams[0];
    assert.equal(d.nodes['PUSH'], 'sendPushNotification / apps/meteor/server/lib/push.ts');
    assert.equal(d.nodes['QUEUE'], 'NotificationQueue');
    assert.deepEqual(d.subgraphs, ['Server Side']);
    assert.deepEqual(d.edges, [['PUSH', 'QUEUE'], ['QUEUE', 'GATEWAY', 'delay']]);
});

test('source_files：行区间合并去重，非文件（无扩展名）丢弃', () => {
    const m = parseWikiMarkdown(FIXTURE, 'RocketChat/Rocket.Chat');
    assert.deepEqual(m.pages[1].source_files['apps/meteor/server/lib/push.ts'], ['10-90', '2-6']);
    assert.ok(!('not-a-file' in m.pages[1].source_files));
});

test('file_to_pages 反向索引', () => {
    const m = parseWikiMarkdown(FIXTURE, 'RocketChat/Rocket.Chat');
    assert.deepEqual(m.file_to_pages['apps/meteor/server/lib/push.ts'], ['Notifications']);
    assert.deepEqual(m.file_to_pages['package.json'], ['Overview']);
});

test('散文不进产物：任何字段里都不出现 prose 句子', () => {
    const m = parseWikiMarkdown(FIXTURE, 'RocketChat/Rocket.Chat');
    assert.ok(!JSON.stringify(m).includes('must NOT survive'));
});
