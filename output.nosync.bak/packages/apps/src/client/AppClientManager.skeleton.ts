## File: packages/apps/src/client/AppClientManager.ts

```typescript
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

import { AppServerCommunicator } from './AppServerCommunicator';
import { AppsEngineUIHost } from './AppsEngineUIHost';

export class AppClientManager {
	private apps: Array<IAppInfo>;

	constructor(
		private readonly appsEngineUIHost: AppsEngineUIHost,
		private readonly communicator?: AppServerCommunicator,
	) {
        /* Implementation Hidden */
    }

	public async load(): Promise<void> {
        /* Implementation Hidden */
    }

	public async initialize(): Promise<void> {
        /* Implementation Hidden */
    }
}

```