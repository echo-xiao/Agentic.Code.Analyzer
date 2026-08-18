// Serialises tool calls so a host that emits several in one message cannot fire three questions'
// worth of Gemini requests at once. The free-tier ceiling is requests per minute, and a 429
// arrives only after the quota is already spent -- queueing is the one form of throttling that
// wastes nothing.
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export function createSerialQueue(spacingMs: number) {
    // The tail is deliberately a promise that never rejects: a failing job must reject its own
    // caller without breaking the chain for everyone queued behind it.
    let tail: Promise<unknown> = Promise.resolve();
    return function enqueue<T>(job: () => Promise<T>): Promise<T> {
        const result = tail.then(job);
        tail = result.then(() => sleep(spacingMs), () => sleep(spacingMs));
        return result;
    };
}
