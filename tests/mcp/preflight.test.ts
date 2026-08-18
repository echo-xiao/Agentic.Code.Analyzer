import { test } from 'node:test';
import assert from 'node:assert/strict';
import { preflightMessage } from '../../src/mcp/preflight.js';

test('preflightMessage: a loaded index and a key means ready', () => {
    assert.equal(preflightMessage(71, 'AIza-whatever'), null);
});

// Both branches exist so the failure costs zero Gemini requests. A 429 or an API_KEY_INVALID
// arrives only after the request is spent, and the free-tier budget is the project's constraint.
test('preflightMessage: no shards names the command that builds them', () => {
    const msg = preflightMessage(0, 'AIza-whatever');
    assert.ok(msg && msg.includes('npm run prewarm'));
});

test('preflightMessage: a missing key names the file it belongs in', () => {
    const msg = preflightMessage(71, undefined);
    assert.ok(msg && msg.includes('GEMINI_API_KEY') && msg.includes('.env'));
});

test('preflightMessage: an empty key counts as missing', () => {
    assert.ok(preflightMessage(71, ''));
});

test('preflightMessage: a missing index is reported before a missing key', () => {
    const msg = preflightMessage(0, undefined);
    assert.ok(msg && msg.includes('npm run prewarm') && !msg.includes('GEMINI_API_KEY'));
});
