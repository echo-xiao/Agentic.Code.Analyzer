import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { checkAgainstBudget, writeBudget, type Budget } from '../../src/indexer/dispatch-budget.js';
import type { SelfCheckRow } from '../../src/indexer/idioms.js';

const row = (space: string, keys: number): SelfCheckRow =>
    ({ space, keys, registerSites: keys, dispatchSites: 0, bothSidesKeys: 0 } as SelfCheckRow);

const tmpFile = () => path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'budget-')), 'dispatch-budget.json');

test('the first run establishes the baseline instead of failing', () => {
    const file = tmpFile();
    const rows = [row('callbacks', 86), row('rest', 639)];

    const result = checkAgainstBudget(rows, 'apps/meteor@extractor-v12', file);

    assert.equal(result.status, 'baseline-written');
    assert.deepEqual(result.failures, []);
    const budget: Budget = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.equal(budget.scopes['apps/meteor@extractor-v12'].spaces.callbacks.keys, 86);
});

test('normal drift passes; a collapse fails and names both numbers', () => {
    const file = tmpFile();
    const scope = 'apps/meteor@extractor-v12';
    checkAgainstBudget([row('callbacks', 86), row('rest', 639)], scope, file);

    // A tenth off is the repo moving, not the extractor breaking.
    assert.equal(checkAgainstBudget([row('callbacks', 78), row('rest', 700)], scope, file).status, 'ok');

    // Half or less is a collapse: an idiom stopped matching.
    const bad = checkAgainstBudget([row('callbacks', 40), row('rest', 639)], scope, file);
    assert.equal(bad.status, 'failed');
    assert.equal(bad.failures.length, 1);
    assert.match(bad.failures[0], /callbacks/);
    assert.match(bad.failures[0], /40/);
    assert.match(bad.failures[0], /86/);
});

test('a count measured under a different scan range is not compared', () => {
    const file = tmpFile();
    checkAgainstBudget([row('callbacks', 86)], 'apps/meteor@extractor-v12', file);

    // The same registry yields 141 / 136 / 78 keys depending on the range scanned, and all three
    // are correct. Comparing across ranges would read a range change as a regression.
    const other = checkAgainstBudget([row('callbacks', 12)], 'packages/core-services@extractor-v12', file);

    assert.equal(other.status, 'baseline-written');
    assert.deepEqual(other.failures, []);
    const budget: Budget = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.equal(budget.scopes['apps/meteor@extractor-v12'].spaces.callbacks.keys, 86);
    assert.equal(budget.scopes['packages/core-services@extractor-v12'].spaces.callbacks.keys, 12);
});

test('a space that vanishes entirely fails even when it is new to the budget', () => {
    const file = tmpFile();
    const scope = 'apps/meteor@extractor-v12';
    checkAgainstBudget([row('callbacks', 86), row('streamer', 16)], scope, file);

    const gone = checkAgainstBudget([row('callbacks', 86), row('streamer', 0)], scope, file);

    // Zero is the failure the whole check exists for: a broken idiom and a working one look the
    // same everywhere else. Measured once already — streamer registrations sat at 0 while every
    // test was green.
    assert.equal(gone.status, 'failed');
    assert.match(gone.failures[0], /streamer/);
});

test('writeBudget keeps unrelated scopes intact', () => {
    const file = tmpFile();
    writeBudget(file, { scopes: { a: { spaces: { callbacks: { keys: 1, bothSidesKeys: 0 } } } } });
    writeBudget(file, { scopes: { b: { spaces: { rest: { keys: 2, bothSidesKeys: 0 } } } } });

    const budget: Budget = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.deepEqual(Object.keys(budget.scopes).sort(), ['a', 'b']);
});
