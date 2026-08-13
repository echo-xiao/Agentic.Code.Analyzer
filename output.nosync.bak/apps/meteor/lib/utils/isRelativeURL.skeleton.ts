## File: apps/meteor/lib/utils/isRelativeURL.ts

```typescript
export const isRelativeURL = (str: string): boolean => /^[^\/]+\/[^\/].*$|^\/[^\/].*$/gim.test(str);

```