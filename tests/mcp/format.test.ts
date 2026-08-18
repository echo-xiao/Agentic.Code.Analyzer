import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatToolResult } from '../../src/mcp/format.js';

const material = (nodeId: string, file: string, startLine: number, endLine: number) =>
    ({ nodeId, file, startLine, endLine, tokens: 1 });

// The answer prompt imposes no citation format, so the model refers to skeleton node ids
// ("[8b]") rather than file:line. The benchmark resolves those against the report's recap; a
// host has no report, so an answer shipped without the mapping cites nothing it can check.
test('formatToolResult appends the node -> source mapping for everything read', () => {
    const out = formatToolResult('PushClass dispatches via [8b] and [9c].', [
        material('8b', 'apps/meteor/app/push/server/apn.ts', 12, 88),
        material('9c', 'apps/meteor/app/push/server/push.ts', 210, 240),
    ]);
    assert.ok(out.includes('PushClass dispatches via [8b]'));
    assert.ok(out.includes('8b  apps/meteor/app/push/server/apn.ts:12-88'));
    assert.ok(out.includes('9c  apps/meteor/app/push/server/push.ts:210-240'));
});

test('formatToolResult: nothing read means no trailing section', () => {
    const out = formatToolResult('No material was read.', []);
    assert.equal(out, 'No material was read.');
});
