## File: packages/rest-typings/src/helpers/WithItemCount.ts

```typescript
export type WithItemCount<T = Record<string, unknown>> = T & {
	count: { total: number }[];
};

```