## File: packages/apps/src/server/managers/UIActionButtonManager.ts

```typescript
import { AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { IUIActionButton, IUIActionButtonDescriptor } from '@rocket.chat/apps-engine/definition/ui';

import type { AppManager } from '../AppManager';
import type { AppActivationBridge } from '../bridges';
import { AppPermissionManager } from './AppPermissionManager';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissions } from '../permissions/AppPermissions';

export class UIActionButtonManager {
	private readonly activationBridge: AppActivationBridge;

	private readonly manager: AppManager;

	private registeredActionButtons = new Map<string, Map<string, IUIActionButtonDescriptor>>();

	constructor(manager: AppManager) {
        /* Implementation Hidden */
    }

	public registerActionButton(appId: string, button: IUIActionButtonDescriptor) {
        /* Implementation Hidden */
    }

	public clearAppActionButtons(appId: string) {
        /* Implementation Hidden */
    }

	public getAppActionButtons(appId: string) {
        /* Implementation Hidden */
    }

	public async getAllActionButtons(): Promise<Array<IUIActionButton>> {
        /* Implementation Hidden */
    }

	private hasPermission(appId: string) {
        /* Implementation Hidden */
    }
}

```