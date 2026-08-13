## File: packages/apps/base-runtime/src/handlers/app/handler.ts

```typescript
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import handleConstructApp from './construct';
import handleGetStatus from './handleGetStatus';
import handleInitialize from './handleInitialize';
import handleOnDisable from './handleOnDisable';
import handleOnEnable from './handleOnEnable';
import handleOnInstall from './handleOnInstall';
import handleOnPreSettingUpdate from './handleOnPreSettingUpdate';
import handleOnSettingUpdated from './handleOnSettingUpdated';
import handleOnUninstall from './handleOnUninstall';
import handleOnUpdate from './handleOnUpdate';
import handleSetStatus from './handleSetStatus';
import handleUploadEvents, { uploadEvents } from './handleUploadEvents';
import type { RequestContext } from '../../lib/requestContext';
import { isOneOf } from '../lib/assertions';
import handleListener from '../listener/handler';
import handleUIKitInteraction, { uikitInteractions } from '../uikit/handler';

export default async function handleApp(request: RequestContext): Promise<Defined | JsonRpcError> {
    /* Implementation Hidden */
}

```