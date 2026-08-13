## File: packages/apps/tests/test-data/utilities.ts

```typescript
import * as os from 'node:os';

import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { HttpStatusCode } from '@rocket.chat/apps-engine/definition/accessors';
import type { IApi, IApiRequest, IApiResponse } from '@rocket.chat/apps-engine/definition/api';
import { ApiSecurity, ApiVisibility } from '@rocket.chat/apps-engine/definition/api';
import type { IApiEndpointInfo } from '@rocket.chat/apps-engine/definition/api/IApiEndpointInfo';
import type { IMessage, IMessageAttachment, IMessageRaw } from '@rocket.chat/apps-engine/definition/messages';
import type {
	IOutboundEmailMessageProvider,
	IOutboundMessage,
	IOutboundPhoneMessageProvider,
	ProviderMetadata,
} from '@rocket.chat/apps-engine/definition/outboundCommunication';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import type {
	ISlashCommand,
	ISlashCommandPreview,
	ISlashCommandPreviewItem,
	SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import { UserStatusConnection, UserType } from '@rocket.chat/apps-engine/definition/users';
import type {
	IVideoConferenceOptions,
	IVideoConfProvider,
	VideoConfData,
	VideoConfDataExtended,
} from '@rocket.chat/apps-engine/definition/videoConfProviders';
import type { AppVideoConference } from '@rocket.chat/apps-engine/definition/videoConferences/AppVideoConference';
import type { VideoConference } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConference';
import { VideoConferenceStatus } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConference';
import type { IVideoConferenceUser } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConferenceUser';

import { TestsAppBridges } from './bridges/appBridges';
import { TestSourceStorage } from './storage/TestSourceStorage';
import { TestsAppLogStorage } from './storage/logStorage';
import { TestsAppStorage } from './storage/storage';
import type { AppOutboundCommunicationProviderManager } from '../../server/managers/AppOutboundCommunicationProviderManager';
import type { AppManager } from '../../src/server/AppManager';
import { ProxiedApp } from '../../src/server/ProxiedApp';
import type { AppBridges } from '../../src/server/bridges';
import { AppPackageParser } from '../../src/server/compiler';
import type {
	AppExternalComponentManager,
	AppSchedulerManager,
	AppSettingsManager,
	AppSlashCommandManager,
	AppVideoConfProviderManager,
} from '../../src/server/managers';
import type { AppRuntimeManager } from '../../src/server/managers/AppRuntimeManager';
import type { UIActionButtonManager } from '../../src/server/managers/UIActionButtonManager';
import type { IMarketplaceInfo, IMarketplaceSubscriptionInfo } from '../../src/server/marketplace';
import { MarketplacePurchaseType } from '../../src/server/marketplace/MarketplacePurchaseType';
import { MarketplaceSubscriptionStatus } from '../../src/server/marketplace/MarketplaceSubscriptionStatus';
import { MarketplaceSubscriptionType } from '../../src/server/marketplace/MarketplaceSubscriptionType';
import type { IRuntimeController } from '../../src/server/runtime/IRuntimeController';
import type { AppLogStorage, AppMetadataStorage, AppSourceStorage, IAppStorageItem } from '../../src/server/storage';
import { AppInstallationSource } from '../../src/server/storage/IAppStorageItem';

export class TestInfastructureSetup {
	private appStorage: TestsAppStorage;

	private logStorage: TestsAppLogStorage;

	private bridges: TestsAppBridges;

	private sourceStorage: TestSourceStorage;

	private appManager: AppManager;

	private runtimeManager: AppRuntimeManager;

	constructor() {
        /* Implementation Hidden */
    }

	public getTempFilePath(): string {
        /* Implementation Hidden */
    }

	public getAppStorage(): AppMetadataStorage {
        /* Implementation Hidden */
    }

	public getLogStorage(): AppLogStorage {
        /* Implementation Hidden */
    }

	public getAppBridges(): AppBridges {
        /* Implementation Hidden */
    }

	public getSourceStorage(): AppSourceStorage {
        /* Implementation Hidden */
    }

	public getMockManager(): AppManager {
        /* Implementation Hidden */
    }
}

const date = new Date();

const DEFAULT_ATTACHMENT = {
	color: '#00b2b2',
	collapsed: false,
	text: 'Just an attachment that is used for testing',
	timestampLink: 'https://google.com/',
	thumbnailUrl: 'https://avatars0.githubusercontent.com/u/850391?s=88&v=4',
	author: {
		name: 'Author Name',
		link: 'https://github.com/graywolf336',
		icon: 'https://avatars0.githubusercontent.com/u/850391?s=88&v=4',
	},
	title: {
		value: 'Attachment Title',
		link: 'https://github.com/RocketChat',
		displayDownloadLink: false,
	},
	imageUrl: 'https://rocket.chat/images/default/logo.svg',
	audioUrl: 'http://www.w3schools.com/tags/horse.mp3',
	videoUrl: 'http://www.w3schools.com/tags/movie.mp4',
	fields: [
		{
			short: true,
			title: 'Test',
			value: 'Testing out something or other',
		},
		{
			short: true,
			title: 'Another Test',
			value: '[Link](https://google.com/) something and this and that.',
		},
	],
};
export class TestData {
	public static getDate(): Date {
        /* Implementation Hidden */
    }

	public static getSetting(id?: string): ISetting {
        /* Implementation Hidden */
    }

	public static getUser(id?: string, username?: string): IUser {
        /* Implementation Hidden */
    }

	public static getRoom(id?: string, slugifiedName?: string): IRoom {
        /* Implementation Hidden */
    }

	public static getMessage(id?: string, text?: string): IMessage {
        /* Implementation Hidden */
    }

	public static getMessageRaw(id?: string, text?: string): IMessageRaw {
        /* Implementation Hidden */
    }

	private static createAttachment(attachment?: IMessageAttachment): IMessageAttachment {
        /* Implementation Hidden */
    }

	public static getSlashCommand(command?: string): ISlashCommand {
        /* Implementation Hidden */
    }

	public static getApi(
		path = 'testing-path',
		visibility: ApiVisibility = ApiVisibility.PUBLIC,
		security: ApiSecurity = ApiSecurity.UNSECURE,
	): IApi {
        /* Implementation Hidden */
    }

	public static getVideoConfProvider(name = 'test'): IVideoConfProvider {
        /* Implementation Hidden */
    }

	public static getInvalidConfProvider(name = 'invalid'): IVideoConfProvider {
        /* Implementation Hidden */
    }

	public static getFullVideoConfProvider(name = 'test'): IVideoConfProvider {
        /* Implementation Hidden */
    }

	public static getVideoConferenceUser(): IVideoConferenceUser {
        /* Implementation Hidden */
    }

	public static getVideoConfData(): VideoConfData {
        /* Implementation Hidden */
    }

	public static getVideoConfDataExtended(providerName = 'test'): VideoConfDataExtended {
        /* Implementation Hidden */
    }

	public static getAppVideoConference(): AppVideoConference {
        /* Implementation Hidden */
    }

	public static getVideoConference(): VideoConference {
        /* Implementation Hidden */
    }

	public static getOutboundPhoneMessageProvider(name = 'Test Phone Provider'): IOutboundPhoneMessageProvider {
        /* Implementation Hidden */
    }

	public static getOutboundEmailMessageProvider(name = 'Test Email Provider'): IOutboundEmailMessageProvider {
        /* Implementation Hidden */
    }

	public static getOutboundMessage(): IOutboundMessage {
        /* Implementation Hidden */
    }

	public static getOAuthApp(isToCreate: boolean) {
        /* Implementation Hidden */
    }

	public static getMockRuntimeController(id: string): IRuntimeController {
        /* Implementation Hidden */
    }

	public static getMockApp(storageItem: Partial<IAppStorageItem>, manager: AppManager): ProxiedApp {
        /* Implementation Hidden */
    }

	public static getMarketplaceSubscriptionInfo(overrides: Partial<IMarketplaceSubscriptionInfo> = {}): IMarketplaceSubscriptionInfo {
        /* Implementation Hidden */
    }

	public static getMarketplaceInfo(overrides: Partial<IMarketplaceInfo> = {}): IMarketplaceInfo {
        /* Implementation Hidden */
    }

	public static getAppStorageItem(overrides: Partial<IAppStorageItem> = {}): IAppStorageItem {
        /* Implementation Hidden */
    }

	public static getAppsOverview(subscriptionInfo?: IMarketplaceSubscriptionInfo): Array<{ latest: IMarketplaceInfo }> {
        /* Implementation Hidden */
    }
}

export class SimpleClass {
	private readonly world: string;

	constructor(world = 'Earith') {
        /* Implementation Hidden */
    }

	public getWorld(): string {
        /* Implementation Hidden */
    }
}

```