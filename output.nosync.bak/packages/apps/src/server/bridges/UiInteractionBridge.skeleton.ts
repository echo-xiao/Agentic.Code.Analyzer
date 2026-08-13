## File: packages/apps/src/server/bridges/UiInteractionBridge.ts

```typescript
import type { IUIKitInteraction } from '@rocket.chat/apps-engine/definition/uikit';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class UiInteractionBridge extends BaseBridge {
	public async doNotifyUser(user: IUser, interaction: IUIKitInteraction, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract notifyUser(user: IUser, interaction: IUIKitInteraction, appId: string): Promise<void>;

	private hasInteractionPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```