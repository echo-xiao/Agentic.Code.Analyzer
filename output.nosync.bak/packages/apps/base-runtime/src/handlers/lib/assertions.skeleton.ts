## File: packages/apps/base-runtime/src/handlers/lib/assertions.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';
import { JsonRpcError } from 'jsonrpc-lite';

/**
 * Known failures that can happen in the runtime.
 *
 * DRT = Deno RunTime
 */
export const Errors = {
	DRT_APP_NOT_AVAILABLE: 'DRT_APP_NOT_AVAILABLE',
	DRT_EVENT_HANDLER_FUNCTION_MISSING: 'DRT_EVENT_HANDLER_FUNCTION_MISSING',
};

export function isRecord(v: unknown): v is Record<string, unknown> {
    /* Implementation Hidden */
}

export function isPlainObject(v: unknown): v is Record<string, unknown> {
    /* Implementation Hidden */
}

/**
 * Type guard function to check if a value is included in a readonly array
 * and narrow its type accordingly.
 */
export function isOneOf<T>(value: unknown, array: readonly T[]): value is T {
    /* Implementation Hidden */
}

export function isApp(v: unknown): v is App {
    /* Implementation Hidden */
}

export function assertAppAvailable(v: unknown): asserts v is App {
    /* Implementation Hidden */
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function assertHandlerFunction(v: unknown): asserts v is Function {
    /* Implementation Hidden */
}

```