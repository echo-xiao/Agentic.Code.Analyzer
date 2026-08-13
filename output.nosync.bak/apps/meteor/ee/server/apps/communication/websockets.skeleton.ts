## File: apps/meteor/ee/server/apps/communication/websockets.ts

```typescript
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import { AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { ISetting as AppsSetting } from '@rocket.chat/apps-engine/definition/settings';
import { api } from '@rocket.chat/core-services';
import { InstanceStatus } from '@rocket.chat/instance-status';

import { AppEvents } from './events';
import notifications from '../../../../app/notifications/server/lib/Notifications';
import { SystemLogger } from '../../../../server/lib/logger/system';
import type { IStreamer } from '../../../../server/modules/streamer/types';
import type { AppServerOrchestrator } from '../orchestrator';

export { AppEvents };
export class AppServerListener {
	private orch: AppServerOrchestrator;

	engineStreamer: IStreamer<'apps-engine'>;

	clientStreamer: IStreamer<'apps'>;

	received;

	constructor(
		orch: AppServerOrchestrator,
		engineStreamer: IStreamer<'apps-engine'>,
		clientStreamer: IStreamer<'apps'>,
		received: Map<any, any>,
	) {
        /* Implementation Hidden */
    }

	async onAppAdded(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onAppStatusUpdated({ appId, status }: { appId: string; status: AppStatus }): Promise<void> {
        /* Implementation Hidden */
    }

	async onAppSettingUpdated({ appId, setting }: { appId: string; setting: AppsSetting }): Promise<void> {
        /* Implementation Hidden */
    }

	async onAppUpdated(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onAppRemoved(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onCommandAdded(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onCommandDisabled(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onCommandUpdated(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onCommandRemoved(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onActionsChanged(): Promise<void> {
        /* Implementation Hidden */
    }
}

export class AppServerNotifier {
	engineStreamer: IStreamer<'apps-engine'>;

	clientStreamer: IStreamer<'apps'>;

	received: Map<any, any>;

	listener: AppServerListener;

	constructor(orch: AppServerOrchestrator) {
        /* Implementation Hidden */
    }

	async appAdded(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async appRemoved(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async appUpdated(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async appStatusUpdated(appId: string, status: AppStatus): Promise<void> {
        /* Implementation Hidden */
    }

	async appSettingsChange(appId: string, setting: AppsSetting): Promise<void> {
        /* Implementation Hidden */
    }

	async commandAdded(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	async commandDisabled(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	async commandUpdated(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	async commandRemoved(command: string): Promise<void> {
        /* Implementation Hidden */
    }

	async actionsChanged(): Promise<void> {
        /* Implementation Hidden */
    }
}

```