import { test } from 'node:test';
import assert from 'node:assert/strict';
import { questionTokens, scoreString, bestAffinity } from './affinity.js';

test('questionTokens：去停用词、去标点、小写、去重、长度≥3', () => {
    const t = questionTokens('How are push notifications triggered after a message is sent?');
    assert.ok(t.includes('push'));
    assert.ok(t.includes('notification'));
    assert.ok(t.includes('message'));
    assert.ok(!t.includes('how'));
    assert.ok(!t.includes('are'));
    assert.ok(!t.includes('a'));
    assert.deepEqual(t, [...new Set(t)]);
});

test('scoreString：相关符号 > 0.5，无关符号 = 0', () => {
    const tokens = ['push', 'notifications', 'message'];
    assert.ok(scoreString(tokens, 'sendPushNotification') > 0.5);
    assert.equal(scoreString(tokens, 'XyzQwrt'), 0);
});

test('scoreString：路径也能打分', () => {
    const tokens = ['push', 'notifications'];
    assert.ok(scoreString(tokens, 'apps/meteor/server/lib/pushNotification.ts') > 0.5);
});

test('bestAffinity 取候选里最高分', () => {
    const tokens = ['push'];
    const best = bestAffinity(tokens, ['AdminPage', 'sendPushNotification']);
    assert.equal(best, scoreString(tokens, 'sendPushNotification'));
});

test('bestAffinity 空候选 = 0', () => {
    assert.equal(bestAffinity(['push'], []), 0);
});

test('scoreString：空 tokens = 0', () => {
    assert.equal(scoreString([], 'anything'), 0);
});

test('questionTokens：复数归一——notifications/dependencies/classes → 单数形', () => {
    const t = questionTokens('How are push notifications and dependencies of classes handled?');
    assert.ok(t.includes('notification'));
    assert.ok(!t.includes('notifications'));
    assert.ok(t.includes('dependency'));
    assert.ok(t.includes('class'));
});

test('questionTokens：ss/us/is/os 结尾不误剪', () => {
    const t = questionTokens('explain the status of the process for this analysis');
    assert.ok(t.includes('status'));
    assert.ok(t.includes('process'));
    assert.ok(t.includes('analysis'));
});

test('复数修复的动机：单数 token 能命中驼峰符号，复数不能（fuzzysort 全字符按序）', () => {
    assert.ok(scoreString(['notification'], 'sendPushNotification') > 0.5);
    assert.equal(scoreString(['notifications'], 'sendPushNotification'), 0);
});
