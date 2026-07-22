import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questionTokens, scoreString, bestAffinity } from '../../../../src/server/engine/walker/affinity.js';

test('questionTokens: strips stopwords, strips punctuation, lowercases, dedupes, length ≥ 3', () => {
    const t = questionTokens('How are push notifications triggered after a message is sent?');
    assert.ok(t.includes('push'));
    assert.ok(t.includes('notification'));
    assert.ok(t.includes('message'));
    assert.ok(!t.includes('how'));
    assert.ok(!t.includes('are'));
    assert.ok(!t.includes('a'));
    assert.deepEqual(t, [...new Set(t)]);
});

test('scoreString: related symbol > 0.5, unrelated symbol = 0', () => {
    const tokens = ['push', 'notifications', 'message'];
    assert.ok(scoreString(tokens, 'sendPushNotification') > 0.5);
    assert.equal(scoreString(tokens, 'XyzQwrt'), 0);
});

test('scoreString: paths can also be scored', () => {
    const tokens = ['push', 'notifications'];
    assert.ok(scoreString(tokens, 'apps/meteor/server/lib/pushNotification.ts') > 0.5);
});

test('bestAffinity takes the highest score among candidates', () => {
    const tokens = ['push'];
    const best = bestAffinity(tokens, ['AdminPage', 'sendPushNotification']);
    assert.equal(best, scoreString(tokens, 'sendPushNotification'));
});

test('bestAffinity with empty candidates = 0', () => {
    assert.equal(bestAffinity(['push'], []), 0);
});

test('scoreString: empty tokens = 0', () => {
    assert.equal(scoreString([], 'anything'), 0);
});

test('questionTokens: plural normalization — notifications/dependencies/classes → singular form', () => {
    const t = questionTokens('How are push notifications and dependencies of classes handled?');
    assert.ok(t.includes('notification'));
    assert.ok(!t.includes('notifications'));
    assert.ok(t.includes('dependency'));
    assert.ok(t.includes('class'));
});

test('questionTokens: ss/us/is/os endings are not wrongly trimmed', () => {
    const t = questionTokens('explain the status of the process for this analysis');
    assert.ok(t.includes('status'));
    assert.ok(t.includes('process'));
    assert.ok(t.includes('analysis'));
});

test('motivation for the plural fix: a singular token can hit a camelCase symbol, a plural cannot (fuzzysort matches all characters in order)', () => {
    assert.ok(scoreString(['notification'], 'sendPushNotification') > 0.5);
    assert.equal(scoreString(['notifications'], 'sendPushNotification'), 0);
});
