## File: packages/tools/src/wrapExceptions.ts

```typescript
const isPromise = <T>(value: unknown): value is Promise<T> => !!value && value instanceof Promise;

export function wrapExceptions<T = any>(
	getter: () => T,
): {
	catch: (errorWrapper: (error: any) => T) => T;
	suppress: (errorWrapper?: (error: any) => void) => T | undefined;
};
export function wrapExceptions<T = any>(
	getter: () => Promise<T>,
): {
	catch: (errorWrapper: (error: any) => T | Awaited<T>) => Promise<T>;
	suppress: (errorWrapper?: (error: any) => void) => Promise<T | undefined>;
};
export function wrapExceptions<T>(getter: () => T) {
    /* Implementation Hidden */
}

```