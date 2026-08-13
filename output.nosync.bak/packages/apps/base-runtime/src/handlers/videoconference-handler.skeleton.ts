## File: packages/apps/base-runtime/src/handlers/videoconference-handler.ts

```typescript
import type { IVideoConfProvider } from '@rocket.chat/apps-engine/definition/videoConfProviders/IVideoConfProvider';
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import { AppObjectRegistry } from '../AppObjectRegistry';
import { AppAccessorsInstance } from '../lib/accessors/mod';
import type { RequestContext } from '../lib/requestContext';
import { wrapComposedApp } from '../lib/wrapAppForRequest';

export default async function videoConferenceHandler(request: RequestContext): Promise<JsonRpcError | Defined> {
    /* Implementation Hidden */
}

```