## File: apps/meteor/ee/app/livechat-enterprise/server/lib/debounceByParams.ts

```typescript
import debounce from 'lodash.debounce';
import mem from 'mem';

interface IMemoizeDebouncedFunction<F extends (...args: any[]) => any> {
	(...args: Parameters<F>): void;
	flush: (...args: Parameters<F>) => void;
}

// Debounce `func` based on passed parameters
// ref: https://github.com/lodash/lodash/issues/2403#issuecomment-816137402
export function memoizeDebounce<F extends (...args: any[]) => any>(func: F, wait = 0, options: any = {}): IMemoizeDebouncedFunction<F> {
    /* Implementation Hidden */
}

```