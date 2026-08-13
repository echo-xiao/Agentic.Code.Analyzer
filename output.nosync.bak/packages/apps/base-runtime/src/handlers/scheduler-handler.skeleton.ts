## File: packages/apps/base-runtime/src/handlers/scheduler-handler.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';
import type { IProcessor } from '@rocket.chat/apps-engine/definition/scheduler/IProcessor';
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import { AppObjectRegistry } from '../AppObjectRegistry';
import { AppAccessorsInstance } from '../lib/accessors/mod';
import type { RequestContext } from '../lib/requestContext';
import { wrapAppForRequest } from '../lib/wrapAppForRequest';
import { assertAppAvailable } from './lib/assertions';

export default async function handleScheduler(request: RequestContext): Promise<Defined | JsonRpcError> {
    /* Implementation Hidden */
}

```