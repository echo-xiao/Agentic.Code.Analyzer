## File: apps/meteor/app/apps/server/bridges/cloud.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { CloudWorkspaceBridge } from '@rocket.chat/apps/dist/server/bridges/CloudWorkspaceBridge';
import type { IWorkspaceToken } from '@rocket.chat/apps-engine/definition/cloud/IWorkspaceToken';

import { getWorkspaceAccessTokenWithScope } from '../../../cloud/server';

export class AppCloudBridge extends CloudWorkspaceBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	public async getWorkspaceToken(scope: string, appId: string): Promise<IWorkspaceToken> {
        /* Implementation Hidden */
    }
}

```