## File: apps/meteor/server/services/apps-engine/service.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import type { IGetAppsFilter } from '@rocket.chat/apps/dist/server/IGetAppsFilter';
import type { IAppStorageItem } from '@rocket.chat/apps/dist/server/storage/IAppStorageItem';
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import { AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import type { AppStatusReport, IAppsEngineService } from '@rocket.chat/core-services';
import { ServiceClassInternal } from '@rocket.chat/core-services';
import { InstanceStatus } from '@rocket.chat/instance-status';

import { isRunningMs } from '../../lib/isRunningMs';
import { SystemLogger } from '../../lib/logger/system';

export class AppsEngineNoNodesFoundError extends Error {
	constructor(message = 'Not enough Apps-Engine nodes in deployment') {
        /* Implementation Hidden */
    }
}

export class AppsEngineService extends ServiceClassInternal implements IAppsEngineService {
	protected name = 'apps-engine';

	constructor() {
        /* Implementation Hidden */
    }

	isInitialized(): boolean {
        /* Implementation Hidden */
    }

	async getApps(query: IGetAppsFilter): Promise<IAppInfo[] | undefined> {
        /* Implementation Hidden */
    }

	async getAppStorageItemById(appId: string): Promise<IAppStorageItem | undefined> {
        /* Implementation Hidden */
    }

	async getAppsStatusLocal(): Promise<{ status: AppStatus; appId: string }[]> {
        /* Implementation Hidden */
    }

	async getAppsStatusInNodes(): Promise<AppStatusReport> {
        /* Implementation Hidden */
    }
}

```