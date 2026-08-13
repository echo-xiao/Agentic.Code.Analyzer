## File: packages/apps/base-runtime/src/lib/wrapAppForRequest.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';

import type { RequestContext } from './requestContext';
import { isApp, isRecord } from '../handlers/lib/assertions';

export function wrapAppForRequest(app: App, req: RequestContext): App {
    /* Implementation Hidden */
}

// Instances of objects that have a reference to an App instance won't change throughout the
// lifetime of the runtime, so we can cache the results to avoid iterating the same object multiple times
const composedCache = new WeakMap<NonNullable<unknown>, ReturnType<typeof findAppProperty>>();

function findAppProperty(v: NonNullable<unknown>): [string, App] | undefined {
    /* Implementation Hidden */
}

export function wrapComposedApp<T extends NonNullable<unknown>>(composed: T, req: RequestContext): T {
    /* Implementation Hidden */
}

```