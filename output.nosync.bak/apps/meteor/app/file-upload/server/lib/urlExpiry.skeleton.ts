## File: apps/meteor/app/file-upload/server/lib/urlExpiry.ts

```typescript
export const MIN_URL_EXPIRY_TIME_SPAN_SECONDS = 5;
export const URL_EXPIRY_FALLBACK_SECONDS = 900;

export const getUrlExpiryTimeSpanWithFallback = (configuredValue: number): number => {
    /* Implementation Hidden */
};

```