## File: packages/rest-typings/src/helpers/PaginatedResult.ts

```typescript
export type PaginatedResult<T = Record<string, boolean | number | string | object>> = {
	count: number;
	offset: number;
	total: number;
} & T;

```