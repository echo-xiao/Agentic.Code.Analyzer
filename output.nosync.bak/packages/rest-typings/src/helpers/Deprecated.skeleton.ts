## File: packages/rest-typings/src/helpers/Deprecated.ts

```typescript
export type Deprecated<T> = (T & { warning: string }) | T;

```