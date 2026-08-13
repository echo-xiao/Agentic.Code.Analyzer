## File: packages/tools/src/isAbsoluteURL.ts

```typescript
export const isAbsoluteURL = (str: string): boolean => /^(https?:\/\/|data:)/.test(str);

```