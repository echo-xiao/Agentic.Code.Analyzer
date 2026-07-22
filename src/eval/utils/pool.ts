// Bounded-concurrency worker pool + retry — shared by summarize.ts / summarize-modules.ts
// so P2 summary regeneration can run N API calls in flight instead of one-at-a-time.

/** Run `worker` over `items` with at most `concurrency` in flight. Order-independent. */
export async function runPool<T>(
  items: T[],
  concurrency: number,
  worker: (item: T, idx: number) => Promise<void>,
): Promise<void> {
  let next = 0;
  const runner = async (): Promise<void> => {
    while (next < items.length) {
      const i = next++;
      await worker(items[i], i);
    }
  };
  const n = Math.max(1, Math.min(concurrency, items.length));
  await Promise.all(Array.from({ length: n }, runner));
}

/** Like runPool but collects results — bounded-concurrency map. Used by judge.ts / truth.ts. */
export async function mapPool<T, R>(items: T[], n: number, fn: (item: T, i: number) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let idx = 0;
  const worker = async () => {
    while (idx < items.length) {
      const i = idx++;
      out[i] = await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, worker));
  return out;
}

// Anthropic transient statuses: 429 rate-limit, 529 overloaded, 5xx, timeouts.
const RETRYABLE = new Set([408, 409, 425, 429, 500, 502, 503, 504, 529]);

/** Retry `fn` with exponential backoff on transient API errors (rate-limit / overload / 5xx / network). */
export async function callWithRetry<T>(fn: () => Promise<T>, max = 5): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (e: any) {
      const msg = String(e?.message ?? '');
      const status = typeof e?.status === 'number'
        ? e.status
        : Number(/\[(\d{3})/.exec(msg)?.[1] ?? /\b(429|5\d\d)\b/.exec(msg)?.[1] ?? 0);
      const retryable = RETRYABLE.has(status)
        || /overloaded|rate.?limit|ECONN|ETIMEDOUT|fetch failed|socket hang|network|timeout/i.test(msg);
      if (attempt >= max || !retryable) throw e;
      await new Promise((r) => setTimeout(r, Math.min(1000 * 2 ** attempt, 20000)));  // 1s,2s,4s,8s,16s
    }
  }
}
