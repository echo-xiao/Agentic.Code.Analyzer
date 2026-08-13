## File: packages/livechat/src/helpers/upsert.ts

```typescript
const getInsertIndex = <T>(array: T[], item: T, ranking: (item: T) => number) => {
    /* Implementation Hidden */
};

export const upsert = <T>(array: T[] = [], item: T, predicate: (item: T) => boolean, ranking: (item: T) => number) => {
    /* Implementation Hidden */
};

```