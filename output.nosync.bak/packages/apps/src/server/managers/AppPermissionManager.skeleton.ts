## File: packages/apps/src/server/managers/AppPermissionManager.ts

```typescript
import type { IPermission } from '@rocket.chat/apps-engine/definition/permissions/IPermission';

import { getPermissionsByAppId } from '../AppManager';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { APPS_ENGINE_RUNTIME_FILE_PREFIX } from '../runtime/AppsEngineRuntime';

export class AppPermissionManager {
	/**
	 * It returns the declaration of the permission if the app declared, or it returns `undefined`.
	 */
	public static hasPermission<P extends IPermission>(appId: string, permission: P): P | undefined {
        /* Implementation Hidden */
    }

	public static notifyAboutError(err: Error): void {
        /* Implementation Hidden */
    }

	private static getCallStack(): string {
        /* Implementation Hidden */
    }
}

```