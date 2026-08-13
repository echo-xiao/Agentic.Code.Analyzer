## File: apps/meteor/server/api/v1/middlewares/tracer.ts

```typescript
import { tracerSpan } from '@rocket.chat/tracing';
import type { MiddlewareHandler } from 'hono';

export const tracerSpanMiddleware: MiddlewareHandler = async (c, next) => {
    /* Implementation Hidden */
};

```