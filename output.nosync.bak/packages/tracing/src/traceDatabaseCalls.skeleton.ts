## File: packages/tracing/src/traceDatabaseCalls.ts

```typescript
import type { Tracer } from '@opentelemetry/api';
import { trace, context, SpanStatusCode } from '@opentelemetry/api';
import type { MongoClient } from 'mongodb';

export const initDatabaseTracing = (tracer: Tracer, client: MongoClient) => {
    /* Implementation Hidden */
};

```