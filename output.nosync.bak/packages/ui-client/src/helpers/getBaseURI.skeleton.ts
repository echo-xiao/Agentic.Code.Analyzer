## File: packages/ui-client/src/helpers/getBaseURI.ts

```typescript
export const getBaseURI = (): string => {
    /* Implementation Hidden */
};

export const isExternal = (href: string): boolean => href.indexOf(getBaseURI()) !== 0;

```