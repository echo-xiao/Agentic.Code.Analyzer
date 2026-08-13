## File: packages/tracing/src/index.ts

```typescript
import { context, propagation, SpanStatusCode, trace } from '@opentelemetry/api';
import type { Span, SpanOptions, Tracer } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import type { MongoClient } from 'mongodb';

import { initDatabaseTracing } from './traceDatabaseCalls';

let tracer: Tracer | undefined;

export * from './traceInstanceMethods';

export function isTracingEnabled() {
    /* Implementation Hidden */
}

export const startTracing = ({ service, db }: { service: string; db: MongoClient }) => {
    /* Implementation Hidden */
};

export function tracerSpan<F extends (span?: Span) => ReturnType<F>>(
	name: string,
	options: SpanOptions,
	fn: F,
	optl?: unknown,
): ReturnType<F> {
    /* Implementation Hidden */
}

export function tracerActiveSpan<F extends (span?: Span) => ReturnType<F>>(
	name: string,
	options: SpanOptions,
	fn: F,
	optl?: unknown,
): ReturnType<F> {
    /* Implementation Hidden */
}

export function injectCurrentContext() {
    /* Implementation Hidden */
}

```