## File: packages/apps/src/server/bridges/HttpBridge.ts

```typescript
import type { IHttpRequest, IHttpResponse, RequestMethod } from '@rocket.chat/apps-engine/definition/accessors';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export interface IHttpBridgeRequestInfo {
	appId: string;
	method: RequestMethod;
	url: string;
	request: IHttpRequest;
}

export abstract class HttpBridge extends BaseBridge {
	public async doCall(info: IHttpBridgeRequestInfo): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }

	protected abstract call(info: IHttpBridgeRequestInfo): Promise<IHttpResponse>;

	private hasDefaultPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```