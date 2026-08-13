## File: packages/tools/src/removeEmpty.ts

```typescript
type NonEmpty<T> = {
	[K in keyof T]: Exclude<T[K], null | undefined>;
};

export function removeEmpty<T extends Record<string, any>>(obj: T): NonEmpty<T> {
    /* Implementation Hidden */
}

```