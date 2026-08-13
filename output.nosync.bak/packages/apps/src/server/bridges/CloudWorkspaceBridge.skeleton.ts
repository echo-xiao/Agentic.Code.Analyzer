## File: packages/apps/src/server/bridges/CloudWorkspaceBridge.ts

```typescript
import type { IWorkspaceToken } from '@rocket.chat/apps-engine/definition/cloud/IWorkspaceToken';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class CloudWorkspaceBridge extends BaseBridge {
	public doGetWorkspaceToken(scope: string, appId: string): Promise<IWorkspaceToken> {
        /* Implementation Hidden */
    }

	protected abstract getWorkspaceToken(scope: string, appId: string): Promise<IWorkspaceToken>;

	private hasCloudTokenPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```