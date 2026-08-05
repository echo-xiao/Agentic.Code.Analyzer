import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMcpResponse } from '../../src/deepwiki/mcp.js';

test('parseMcpResponse: uses the data: line carrying result, not just the first data: line', () => {
    const body = [
        'data: {"jsonrpc":"2.0","method":"notifications/progress","params":{}}',
        'data: {"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"the answer"}]}}',
        '',
    ].join('\n');
    assert.equal(parseMcpResponse(body, 'ask_question'), 'the answer');
});

test('parseMcpResponse: joins multiple text content items', () => {
    const body = JSON.stringify({
        jsonrpc: '2.0', id: 1,
        result: { content: [{ type: 'text', text: 'part one' }, { type: 'text', text: 'part two' }] },
    });
    assert.equal(parseMcpResponse(body, 'ask_question'), 'part one\npart two');
});

test('parseMcpResponse: throws with a raw payload snippet when there is no text content', () => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: 1, result: { content: [] } });
    assert.throws(() => parseMcpResponse(body, 'ask_question'), /no text content/);
});

test('parseMcpResponse: throws on a JSON-RPC error payload', () => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: 1, error: { code: -32000, message: 'boom' } });
    assert.throws(() => parseMcpResponse(body, 'ask_question'), /returned an error/);
});
