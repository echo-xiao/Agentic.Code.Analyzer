## File: packages/apps/deno-runtime/error-handlers.ts

```typescript
import * as Messenger from '@rocket.chat/apps/base-runtime/lib/messenger';

export function unhandledRejectionListener(event: PromiseRejectionEvent) {
    /* Implementation Hidden */
}

export function unhandledExceptionListener(event: ErrorEvent) {
    /* Implementation Hidden */
}

export default function registerErrorListeners() {
    /* Implementation Hidden */
}

```