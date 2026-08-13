## File: apps/meteor/client/lib/utils/userAgentMIMETypeFallback.ts

```typescript
/*
 * Some browsers don't support the MIME type for quicktime video encoder, so we need to
 * fallback to the 'video/mp4'. There are other fallbacks for other browsers, but this is
 * the only one we need for now.
 * @param type - the MIME type to check
 * @returns the MIME type to use
 */
export const userAgentMIMETypeFallback = (type: string): string => {
    /* Implementation Hidden */
};

```