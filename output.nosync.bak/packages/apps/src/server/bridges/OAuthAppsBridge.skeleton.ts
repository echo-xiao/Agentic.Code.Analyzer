## File: packages/apps/src/server/bridges/OAuthAppsBridge.ts

```typescript
import type { IOAuthApp, IOAuthAppParams } from '@rocket.chat/apps-engine/definition/accessors/IOAuthApp';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class OAuthAppsBridge extends BaseBridge {
	public async doCreate(oAuthApp: IOAuthAppParams, appId: string) {
        /* Implementation Hidden */
    }

	public async doGetByid(id: string, appId: string) {
        /* Implementation Hidden */
    }

	public async doGetByName(name: string, appId: string) {
        /* Implementation Hidden */
    }

	public async doUpdate(oAuthApp: IOAuthAppParams, id: string, appId: string) {
        /* Implementation Hidden */
    }

	public async doDelete(id: string, appId: string) {
        /* Implementation Hidden */
    }

	public async doPurge(appId: string) {
        /* Implementation Hidden */
    }

	protected abstract create(oAuthApp: IOAuthAppParams, appId: string): Promise<string | null>;

	protected abstract getById(id: string, appId: string): Promise<IOAuthApp | null>;

	protected abstract getByName(name: string, appId: string): Promise<Array<IOAuthApp | null>>;

	protected abstract update(oAuthApp: IOAuthAppParams, id: string, appId: string): Promise<void>;

	protected abstract delete(id: string, appId: string): Promise<void>;

	protected abstract purge(appId: string): Promise<void>;

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```