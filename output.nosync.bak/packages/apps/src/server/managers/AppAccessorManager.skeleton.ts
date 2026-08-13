## File: packages/apps/src/server/managers/AppAccessorManager.ts

```typescript
import type {
	IConfigurationExtend,
	IConfigurationModify,
	IEnvironmentRead,
	IEnvironmentWrite,
	IHttp,
	IHttpExtend,
	IModify,
	IPersistence,
	IRead,
} from '@rocket.chat/apps-engine/definition/accessors';

import type { AppManager } from '../AppManager';
import {
	ApiExtend,
	ConfigurationExtend,
	ConfigurationModify,
	EnvironmentalVariableRead,
	EnvironmentRead,
	EnvironmentWrite,
	ExternalComponentsExtend,
	Http,
	HttpExtend,
	LivechatRead,
	MessageRead,
	Modify,
	Notifier,
	OAuthAppsReader,
	OutboundMessageProviderExtend,
	Persistence,
	PersistenceRead,
	Reader,
	RoleRead,
	RoomRead,
	SchedulerExtend,
	SchedulerModify,
	ServerSettingRead,
	ServerSettingsModify,
	ServerSettingUpdater,
	SettingRead,
	SettingsExtend,
	SettingUpdater,
	SlashCommandsExtend,
	SlashCommandsModify,
	UploadRead,
	UserRead,
	VideoConferenceRead,
	VideoConfProviderExtend,
} from '../accessors';
import { CloudWorkspaceRead } from '../accessors/CloudWorkspaceRead';
import { ContactRead } from '../accessors/ContactRead';
import { ExperimentalRead } from '../accessors/ExperimentalRead';
import { ThreadRead } from '../accessors/ThreadRead';
import { UIExtend } from '../accessors/UIExtend';
import type { AppBridges } from '../bridges/AppBridges';

export class AppAccessorManager {
	private readonly bridges: AppBridges;

	private readonly configExtenders: Map<string, IConfigurationExtend>;

	private readonly envReaders: Map<string, IEnvironmentRead>;

	private readonly envWriters: Map<string, IEnvironmentWrite>;

	private readonly configModifiers: Map<string, IConfigurationModify>;

	private readonly readers: Map<string, IRead>;

	private readonly modifiers: Map<string, IModify>;

	private readonly persists: Map<string, IPersistence>;

	private readonly https: Map<string, IHttp>;

	constructor(private readonly manager: AppManager) {
        /* Implementation Hidden */
    }

	/**
	 * Purifies the accessors for the provided App.
	 *
	 * @param appId The id of the App to purge the accessors for.
	 */
	public purifyApp(appId: string): void {
        /* Implementation Hidden */
    }

	public getConfigurationExtend(appId: string): IConfigurationExtend {
        /* Implementation Hidden */
    }

	public getEnvironmentRead(appId: string): IEnvironmentRead {
        /* Implementation Hidden */
    }

	public getEnvironmentWrite(appId: string): IEnvironmentWrite {
        /* Implementation Hidden */
    }

	public getConfigurationModify(appId: string): IConfigurationModify {
        /* Implementation Hidden */
    }

	public getReader(appId: string): IRead {
        /* Implementation Hidden */
    }

	public getModifier(appId: string): IModify {
        /* Implementation Hidden */
    }

	public getPersistence(appId: string): IPersistence {
        /* Implementation Hidden */
    }

	public getHttp(appId: string): IHttp {
        /* Implementation Hidden */
    }
}

```