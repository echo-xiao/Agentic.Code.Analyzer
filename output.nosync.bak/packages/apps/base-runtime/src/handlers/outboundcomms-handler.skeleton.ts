## File: packages/apps/base-runtime/src/handlers/outboundcomms-handler.ts

```typescript
import type { IOutboundMessageProviders } from '@rocket.chat/apps-engine/definition/outboundCommunication/IOutboundCommsProvider';
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import { AppObjectRegistry } from '../AppObjectRegistry';
import { AppAccessorsInstance } from '../lib/accessors/mod';
import type { RequestContext } from '../lib/requestContext';
import { wrapComposedApp } from '../lib/wrapAppForRequest';

export default async function outboundMessageHandler(request: RequestContext): Promise<JsonRpcError | Defined> {
    /* Implementation Hidden */
}

```