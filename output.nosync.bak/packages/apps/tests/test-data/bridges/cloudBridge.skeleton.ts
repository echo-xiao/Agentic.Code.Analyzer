## File: packages/apps/tests/test-data/bridges/cloudBridge.ts

```typescript
import type { IWorkspaceToken } from '@rocket.chat/apps-engine/definition/cloud/IWorkspaceToken';

import { CloudWorkspaceBridge } from '../../../src/server/bridges/CloudWorkspaceBridge';

export class TestAppCloudWorkspaceBridge extends CloudWorkspaceBridge {
	constructor() {
        /* Implementation Hidden */
    }

	public async getWorkspaceToken(scope: string, appId: string): Promise<IWorkspaceToken> {
        /* Implementation Hidden */
    }
}

```