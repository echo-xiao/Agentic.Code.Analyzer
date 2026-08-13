## File: packages/apps/src/server/bridges/RoleBridge.ts

```typescript
import type { IRole } from '@rocket.chat/apps-engine/definition/roles';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class RoleBridge extends BaseBridge {
	public async doGetOneByIdOrName(idOrName: string, appId: string): Promise<IRole | null> {
        /* Implementation Hidden */
    }

	public async doGetCustomRoles(appId: string): Promise<Array<IRole>> {
        /* Implementation Hidden */
    }

	protected abstract getOneByIdOrName(idOrName: string, appId: string): Promise<IRole | null>;

	protected abstract getCustomRoles(appId: string): Promise<Array<IRole>>;

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```