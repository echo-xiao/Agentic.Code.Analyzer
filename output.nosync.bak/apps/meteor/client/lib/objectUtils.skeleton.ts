## File: apps/meteor/client/lib/objectUtils.ts

```typescript
export function objectKeys<T extends Record<string, any>>(obj: T): (keyof T)[] {
    /* Implementation Hidden */
}

export function entriesOf<T extends Record<string, any>>(obj: T): [keyof T, T[keyof T]][] {
    /* Implementation Hidden */
}

```