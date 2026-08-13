## File: apps/meteor/app/apps/server/bridges/http.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import type { IHttpBridgeRequestInfo } from '@rocket.chat/apps/dist/server/bridges/HttpBridge';
import { HttpBridge } from '@rocket.chat/apps/dist/server/bridges/HttpBridge';
import type { IHttpResponse } from '@rocket.chat/apps-engine/definition/accessors';
import { serverFetch as fetch, type ExtendedFetchOptions } from '@rocket.chat/server-fetch';
import { censorUrl } from '@rocket.chat/tools';

import { settings } from '../../../settings/server';

const isGetOrHead = (method: string): boolean => ['GET', 'HEAD'].includes(method.toUpperCase());

// Previously, there was no timeout for HTTP requests.
// We're setting the default timeout now to 3 minutes as it
// seems to be a good balance
const DEFAULT_TIMEOUT = 3 * 60 * 1000;

export class AppHttpBridge extends HttpBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async call(info: IHttpBridgeRequestInfo): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }
}

```