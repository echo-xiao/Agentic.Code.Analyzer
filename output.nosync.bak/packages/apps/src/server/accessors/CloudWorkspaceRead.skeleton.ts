## File: packages/apps/src/server/accessors/CloudWorkspaceRead.ts

```typescript
import type { ICloudWorkspaceRead } from '@rocket.chat/apps-engine/definition/accessors/ICloudWorkspaceRead';
import type { IWorkspaceToken } from '@rocket.chat/apps-engine/definition/cloud/IWorkspaceToken';

import type { CloudWorkspaceBridge } from '../bridges/CloudWorkspaceBridge';

export class CloudWorkspaceRead implements ICloudWorkspaceRead {
	constructor(
		private readonly cloudBridge: CloudWorkspaceBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async getWorkspaceToken(scope: string): Promise<IWorkspaceToken> {
        /* Implementation Hidden */
    }
}

```