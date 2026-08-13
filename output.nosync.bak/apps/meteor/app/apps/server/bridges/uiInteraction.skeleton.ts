## File: apps/meteor/app/apps/server/bridges/uiInteraction.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { UiInteractionBridge as AppsEngineUiInteractionBridge } from '@rocket.chat/apps/dist/server/bridges/UiInteractionBridge';
import type { IUIKitInteraction } from '@rocket.chat/apps-engine/definition/uikit';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import { api } from '@rocket.chat/core-services';
import type * as UiKit from '@rocket.chat/ui-kit';

export class UiInteractionBridge extends AppsEngineUiInteractionBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async notifyUser(user: IUser, interaction: IUIKitInteraction, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```