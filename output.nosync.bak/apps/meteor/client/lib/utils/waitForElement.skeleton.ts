## File: apps/meteor/client/lib/utils/waitForElement.ts

```typescript
export const waitForElement = async <TElement extends Element>(
	selector: string,
	{ parent = document.documentElement, signal }: { parent?: Element; signal?: AbortSignal } = {},
): Promise<TElement> => {
    /* Implementation Hidden */
};

```