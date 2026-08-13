## File: packages/apps/src/server/accessors/Http.ts

```typescript
import type { IHttp, IHttpExtend, IHttpRequest, IHttpResponse } from '@rocket.chat/apps-engine/definition/accessors';
import { RequestMethod } from '@rocket.chat/apps-engine/definition/accessors';

import type { AppBridges } from '../bridges/AppBridges';
import type { AppAccessorManager } from '../managers/AppAccessorManager';

export class Http implements IHttp {
	constructor(
		private readonly accessManager: AppAccessorManager,
		private readonly bridges: AppBridges,
		private readonly httpExtender: IHttpExtend,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public get(url: string, options?: IHttpRequest): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }

	public put(url: string, options?: IHttpRequest): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }

	public post(url: string, options?: IHttpRequest): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }

	public del(url: string, options?: IHttpRequest): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }

	public patch(url: string, options?: IHttpRequest): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }

	private async _processHandler(url: string, method: RequestMethod, options?: IHttpRequest): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }
}

```