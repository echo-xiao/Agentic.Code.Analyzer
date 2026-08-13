## File: packages/media-signaling/src/lib/utils/getExternalWaiter.ts

```typescript
export type PromiseWaiterData = {
	done: boolean;
	promise: Promise<void>;
	promiseReject: (error: Error) => void;
	promiseResolve: () => void;
	timeout: ReturnType<typeof setTimeout> | null;
};

export type PromiseWaiterParams = {
	timeout?: number;
	timeoutFn?: () => void;
	cleanupFn?: () => void;
};

export function getExternalWaiter({ timeout, timeoutFn, cleanupFn }: PromiseWaiterParams = {}): PromiseWaiterData {
    /* Implementation Hidden */
}

```