## File: apps/meteor/lib/utils/omit.ts

```typescript
export function omit<TObject, TKey extends keyof TObject>(obj: TObject, ...keys: TKey[]): Omit<TObject, TKey> {
    /* Implementation Hidden */
}

```