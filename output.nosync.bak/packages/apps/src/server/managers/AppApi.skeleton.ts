## File: packages/apps/src/server/managers/AppApi.ts

```typescript
import type { IApi, IApiRequest, IApiResponse } from '@rocket.chat/apps-engine/definition/api';
import { ApiSecurity, ApiVisibility } from '@rocket.chat/apps-engine/definition/api';
import type { IApiEndpoint } from '@rocket.chat/apps-engine/definition/api/IApiEndpoint';
import type { IApiEndpointInfo } from '@rocket.chat/apps-engine/definition/api/IApiEndpointInfo';

import type { ProxiedApp } from '../ProxiedApp';
import type { AppLogStorage } from '../storage';
import type { AppAccessorManager } from './AppAccessorManager';

export class AppApi {
	public readonly computedPath: string;

	public readonly basePath: string;

	public readonly appId: string;

	public readonly hash?: string;

	public readonly implementedMethods: Array<string>;

	constructor(
		public app: ProxiedApp,
		public api: IApi,
		public endpoint: IApiEndpoint,
	) {
        /* Implementation Hidden */
    }

	public async runExecutor(request: IApiRequest, _logStorage: AppLogStorage, _accessors: AppAccessorManager): Promise<IApiResponse> {
        /* Implementation Hidden */
    }

	private validateVisibility(request: IApiRequest): boolean {
        /* Implementation Hidden */
    }

	private validateSecurity(_request: IApiRequest): boolean {
        /* Implementation Hidden */
    }
}

```