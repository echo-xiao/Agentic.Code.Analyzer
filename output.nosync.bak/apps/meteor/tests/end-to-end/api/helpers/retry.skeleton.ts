## File: apps/meteor/tests/end-to-end/api/helpers/retry.ts

```typescript
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * Retry a given function N times until it succeeds.
 * It should not be as workaround for eventual consistency, but in cases api calls have to be retried because of async tasks, it must be intentionally used.
 *
 * @param {Function} fn - Function that performs the assert/check.
 * @param {number} retries - Number of retries.
 * @param {number} delayMs - Delay between retries (ms).
 */
export async function retry(_description: string, fn: () => Promise<void> | void, options: { retries?: number; delayMs?: number } = {}) {
    /* Implementation Hidden */
}

```