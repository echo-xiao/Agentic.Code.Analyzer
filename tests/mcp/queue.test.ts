import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSerialQueue } from '../../src/mcp/queue.js';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// The whole point of the queue is the free-tier request budget: a host can emit several tool
// calls in one message, and three concurrent questions would be nine Gemini requests at once.
test('createSerialQueue runs jobs one at a time, spaced apart', async () => {
    const SPACING = 30;
    const enqueue = createSerialQueue(SPACING);
    const spans: { start: number; end: number }[] = [];
    const job = async () => {
        const start = Date.now();
        await sleep(10);
        spans.push({ start, end: Date.now() });
    };
    await Promise.all([enqueue(job), enqueue(job), enqueue(job)]);

    assert.equal(spans.length, 3);
    for (let i = 1; i < spans.length; i++) {
        assert.ok(spans[i].start >= spans[i - 1].end, `job ${i} overlapped job ${i - 1}`);
        assert.ok(spans[i].start - spans[i - 1].end >= SPACING - 5,
            `gap ${spans[i].start - spans[i - 1].end}ms is below the ${SPACING}ms spacing`);
    }
});

test('createSerialQueue: a job that throws rejects only its own caller', async () => {
    const enqueue = createSerialQueue(0);
    const failing = enqueue(async () => { throw new Error('boom'); });
    const following = enqueue(async () => 'ok');
    await assert.rejects(failing, /boom/);
    assert.equal(await following, 'ok');
});

test('createSerialQueue returns each job its own resolved value', async () => {
    const enqueue = createSerialQueue(0);
    const results = await Promise.all([enqueue(async () => 1), enqueue(async () => 2)]);
    assert.deepEqual(results, [1, 2]);
});
