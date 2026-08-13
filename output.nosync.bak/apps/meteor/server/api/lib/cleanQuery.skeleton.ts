## File: apps/meteor/server/api/lib/cleanQuery.ts

```typescript
type Query = { [k: string]: any };

const denyList = ['constructor', '__proto__', 'prototype'];

export const removeDangerousProps = (v: Query): Query => {
    /* Implementation Hidden */
};
/* @deprecated */
export function clean(v: Query, allowList: string[] = []): Query {
    /* Implementation Hidden */
}

```