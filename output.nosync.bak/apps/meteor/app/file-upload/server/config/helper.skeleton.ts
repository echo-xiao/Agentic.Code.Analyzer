## File: apps/meteor/app/file-upload/server/config/helper.ts

```typescript
import type http from 'node:http';
import URL from 'node:url';

export const forceDownload = (req: http.IncomingMessage): boolean => {
    /* Implementation Hidden */
};

export const getContentDisposition = (req: http.IncomingMessage): string => {
    /* Implementation Hidden */
};

```