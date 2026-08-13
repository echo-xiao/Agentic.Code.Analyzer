## File: packages/tools/src/pick.ts

```typescript
export function pick<TObject extends Record<string, any>, TKey extends keyof TObject>(
	object: TObject,
	...attributes: TKey[]
): Pick<TObject, TKey> {
    /* Implementation Hidden */
}

```