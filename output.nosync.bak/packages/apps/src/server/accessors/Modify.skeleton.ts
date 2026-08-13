## File: packages/apps/src/server/accessors/Modify.ts

```typescript
import type {
	IModify,
	IModifyCreator,
	IModifyDeleter,
	IModifyExtender,
	IModifyUpdater,
	INotifier,
	ISchedulerModify,
	IUIController,
} from '@rocket.chat/apps-engine/definition/accessors';
import type { IOAuthAppsModify } from '@rocket.chat/apps-engine/definition/accessors/IOAuthAppsModify';

import type { AppBridges } from '../bridges';
import { ModerationModify } from './ModerationModify';
import { ModifyCreator } from './ModifyCreator';
import { ModifyDeleter } from './ModifyDeleter';
import { ModifyExtender } from './ModifyExtender';
import { ModifyUpdater } from './ModifyUpdater';
import { Notifier } from './Notifier';
import { OAuthAppsModify } from './OAuthAppsModify';
import { SchedulerModify } from './SchedulerModify';
import { UIController } from './UIController';

export class Modify implements IModify {
	private creator: IModifyCreator;

	private deleter: IModifyDeleter;

	private updater: IModifyUpdater;

	private extender: IModifyExtender;

	private notifier: INotifier;

	private uiController: IUIController;

	private scheduler: ISchedulerModify;

	private oauthApps: IOAuthAppsModify;

	private moderation: ModerationModify;

	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public getCreator(): IModifyCreator {
        /* Implementation Hidden */
    }

	public getDeleter(): IModifyDeleter {
        /* Implementation Hidden */
    }

	public getUpdater(): IModifyUpdater {
        /* Implementation Hidden */
    }

	public getExtender(): IModifyExtender {
        /* Implementation Hidden */
    }

	public getNotifier(): INotifier {
        /* Implementation Hidden */
    }

	public getUiController(): IUIController {
        /* Implementation Hidden */
    }

	public getScheduler(): ISchedulerModify {
        /* Implementation Hidden */
    }

	public getOAuthAppsModifier() {
        /* Implementation Hidden */
    }

	public getModerationModifier() {
        /* Implementation Hidden */
    }
}

```