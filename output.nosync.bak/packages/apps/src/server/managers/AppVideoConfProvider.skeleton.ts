## File: packages/apps/src/server/managers/AppVideoConfProvider.ts

```typescript
import { AppMethod } from '@rocket.chat/apps-engine/definition/metadata';
import type { IBlock } from '@rocket.chat/apps-engine/definition/uikit';
import type {
	IVideoConferenceOptions,
	IVideoConfProvider,
	VideoConfData,
	VideoConfDataExtended,
} from '@rocket.chat/apps-engine/definition/videoConfProviders';
import type { VideoConference } from '@rocket.chat/apps-engine/definition/videoConferences';
import type { IVideoConferenceUser } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConferenceUser';

import type { ProxiedApp } from '../ProxiedApp';
import type { AppAccessorManager } from './AppAccessorManager';
import { JSONRPC_METHOD_NOT_FOUND } from '../runtime/base/BaseRuntimeSubprocessController';
import type { AppLogStorage } from '../storage';

export class AppVideoConfProvider {
	/**
	 * States whether this provider has been registered into the Rocket.Chat system or not.
	 */
	public isRegistered: boolean;

	constructor(
		public app: ProxiedApp,
		public provider: IVideoConfProvider,
	) {
        /* Implementation Hidden */
    }

	public hasBeenRegistered(): void {
        /* Implementation Hidden */
    }

	public async runIsFullyConfigured(logStorage: AppLogStorage, accessors: AppAccessorManager): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async runGenerateUrl(call: VideoConfData, logStorage: AppLogStorage, accessors: AppAccessorManager): Promise<string> {
        /* Implementation Hidden */
    }

	public async runCustomizeUrl(
		call: VideoConfDataExtended,
		user: IVideoConferenceUser | undefined,
		options: IVideoConferenceOptions = {},
		logStorage: AppLogStorage,
		accessors: AppAccessorManager,
	): Promise<string> {
        /* Implementation Hidden */
    }

	public async runOnNewVideoConference(call: VideoConference, logStorage: AppLogStorage, accessors: AppAccessorManager): Promise<void> {
        /* Implementation Hidden */
    }

	public async runOnVideoConferenceChanged(call: VideoConference, logStorage: AppLogStorage, accessors: AppAccessorManager): Promise<void> {
        /* Implementation Hidden */
    }

	public async runOnUserJoin(
		call: VideoConference,
		user: IVideoConferenceUser | undefined,
		logStorage: AppLogStorage,
		accessors: AppAccessorManager,
	): Promise<void> {
        /* Implementation Hidden */
    }

	public async runGetVideoConferenceInfo(
		call: VideoConference,
		user: IVideoConferenceUser | undefined,
		logStorage: AppLogStorage,
		accessors: AppAccessorManager,
	): Promise<Array<IBlock> | undefined> {
        /* Implementation Hidden */
    }

	private async runTheCode(
		method:
			| AppMethod._VIDEOCONF_GENERATE_URL
			| AppMethod._VIDEOCONF_CUSTOMIZE_URL
			| AppMethod._VIDEOCONF_IS_CONFIGURED
			| AppMethod._VIDEOCONF_NEW
			| AppMethod._VIDEOCONF_CHANGED
			| AppMethod._VIDEOCONF_GET_INFO
			| AppMethod._VIDEOCONF_USER_JOINED,
		_logStorage: AppLogStorage,
		_accessors: AppAccessorManager,
		runContextArgs: Array<any>,
	): Promise<string | boolean | Array<IBlock> | undefined> {
        /* Implementation Hidden */
    }
}

```