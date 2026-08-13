## File: packages/apps/base-runtime/src/handlers/api-handler.ts

```typescript
import type { IApiEndpoint } from '@rocket.chat/apps-engine/definition/api/IApiEndpoint';
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import { AppObjectRegistry } from '../AppObjectRegistry';
import { AppAccessorsInstance } from '../lib/accessors/mod';
import type { RequestContext } from '../lib/requestContext';
import { wrapComposedApp } from '../lib/wrapAppForRequest';

export default async function apiHandler(request: RequestContext): Promise<JsonRpcError | Defined> {
    /* Implementation Hidden */
}

```