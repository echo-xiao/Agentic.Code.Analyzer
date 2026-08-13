## File: apps/meteor/lib/transforms.ts

```typescript
type Transform<T, U extends T | Promise<Awaited<T>>> = (x: T) => U;

type TransformChain<T, U extends T | Promise<Awaited<T>>> = {
	(x: T): U;
	use(transform: Transform<T, U>): () => void;
};

export const createAsyncTransformChain = <T>(
	...transforms: Transform<T, Promise<Awaited<T>>>[]
): TransformChain<T, Promise<Awaited<T>>> => {
    /* Implementation Hidden */
};

```