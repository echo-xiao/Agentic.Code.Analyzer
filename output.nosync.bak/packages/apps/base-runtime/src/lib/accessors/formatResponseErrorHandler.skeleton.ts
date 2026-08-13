## File: packages/apps/base-runtime/src/lib/accessors/formatResponseErrorHandler.ts

```typescript
import { ErrorObject } from 'jsonrpc-lite';

// deno-lint-ignore no-explicit-any -- that is the type we get from `catch`
export const formatErrorResponse = (error: any): Error => {
    /* Implementation Hidden */
};

```