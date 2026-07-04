import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SYSTEM_PROMPT } from './gen.js';

test('SYSTEM_PROMPT does not leak a real core file path', () => {
    assert.doesNotMatch(SYSTEM_PROMPT, /sendMessage\.ts/);
    assert.doesNotMatch(SYSTEM_PROMPT, /apps\/meteor\//);
});
test('importing gen.ts is side-effect-safe (main did not run)', () => {
    // If the import had executed main(), it would have demanded GEMINI_API_KEY / made a network
    // call. Reaching here with SYSTEM_PROMPT defined proves the entry-point guard works.
    assert.equal(typeof SYSTEM_PROMPT, 'string');
    assert.ok(SYSTEM_PROMPT.length > 0);
});
