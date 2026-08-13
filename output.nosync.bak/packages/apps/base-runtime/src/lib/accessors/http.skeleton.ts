## File: packages/apps/base-runtime/src/lib/accessors/http.ts

```typescript
import type { IHttp, IHttpExtend, IHttpRequest, IHttpResponse } from '@rocket.chat/apps-engine/definition/accessors/IHttp';
import type { IPersistence } from '@rocket.chat/apps-engine/definition/accessors/IPersistence';
import type { IRead } from '@rocket.chat/apps-engine/definition/accessors/IRead';

import { AppObjectRegistry } from '../../AppObjectRegistry';
import type * as Messenger from '../messenger';
import { formatErrorResponse } from './formatResponseErrorHandler';

type RequestMethod = 'get' | 'post' | 'put' | 'head' | 'delete' | 'patch';

export class Http implements IHttp {
	private httpExtender: IHttpExtend;

	private read: IRead;

	private persistence: IPersistence;

	private senderFn: typeof Messenger.sendRequest;

	constructor(read: IRead, persistence: IPersistence, httpExtender: IHttpExtend, senderFn: typeof Messenger.sendRequest) {
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