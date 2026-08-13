## File: packages/apps/src/server/AppManager.ts

```typescript
import { Buffer } from 'node:buffer';

import { AppStatus, AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { AppMethod } from '@rocket.chat/apps-engine/definition/metadata';
import type { IPermission } from '@rocket.chat/apps-engine/definition/permissions/IPermission';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import { UserType } from '@rocket.chat/apps-engine/definition/users';

import type { IGetAppsFilter } from './IGetAppsFilter';
import { ProxiedApp } from './ProxiedApp';
import { AppBridges } from './bridges';
import type { PersistenceBridge, UserBridge } from './bridges';
import type { IInternalPersistenceBridge } from './bridges/IInternalPersistenceBridge';
import type { IInternalUserBridge } from './bridges/IInternalUserBridge';
import { AppCompiler, AppFabricationFulfillment, AppPackageParser } from './compiler';
import { InvalidLicenseError } from './errors';
import { InvalidInstallationError } from './errors/InvalidInstallationError';
import {
	AppAccessorManager,
	AppApiManager,
	AppExternalComponentManager,
	AppLicenseManager,
	AppListenerManager,
	AppSchedulerManager,
	AppSettingsManager,
	AppSlashCommandManager,
	AppVideoConfProviderManager,
} from './managers';
import { AppOutboundCommunicationProviderManager } from './managers/AppOutboundCommunicationProviderManager';
import { AppRuntimeManager } from './managers/AppRuntimeManager';
import { AppSignatureManager } from './managers/AppSignatureManager';
import { UIActionButtonManager } from './managers/UIActionButtonManager';
import type { IMarketplaceInfo } from './marketplace';
import { defaultPermissions } from './permissions/AppPermissions';
import { EmptyRuntime } from './runtime/EmptyRuntime';
import type { IAppStorageItem } from './storage';
import { AppLogStorage, AppMetadataStorage } from './storage';
import { AppSourceStorage } from './storage/AppSourceStorage';
import { AppInstallationSource } from './storage/IAppStorageItem';

export interface IAppInstallParameters {
	enable: boolean;
	marketplaceInfo?: IMarketplaceInfo[];
	permissionsGranted?: Array<IPermission>;
	user: IUser;
}

export interface IAppUninstallParameters {
	user: IUser;
}

export interface IAppManagerDeps {
	metadataStorage: AppMetadataStorage;
	logStorage: AppLogStorage;
	bridges: AppBridges;
	sourceStorage: AppSourceStorage;
	/**
	 * Path to temporary file storage.
	 *
	 * Needs to be accessible for reading and writing.
	 */
	tempFilePath: string;
}

interface IPurgeAppConfigOpts {
	keepScheduledJobs?: boolean;
	keepSlashcommands?: boolean;
	keepOutboundCommunicationProviders?: boolean;
}

export class AppManager {
	public static Instance: AppManager;

	// apps contains all of the Apps
	private readonly apps: Map<string, ProxiedApp>;

	private readonly appMetadataStorage: AppMetadataStorage;

	private appSourceStorage: AppSourceStorage;

	private readonly logStorage: AppLogStorage;

	private readonly bridges: AppBridges;

	private readonly parser: AppPackageParser;

	private readonly compiler: AppCompiler;

	private readonly accessorManager: AppAccessorManager;

	private readonly listenerManager: AppListenerManager;

	private readonly commandManager: AppSlashCommandManager;

	private readonly apiManager: AppApiManager;

	private readonly externalComponentManager: AppExternalComponentManager;

	private readonly settingsManager: AppSettingsManager;

	private readonly licenseManager: AppLicenseManager;

	private readonly schedulerManager: AppSchedulerManager;

	private readonly uiActionButtonManager: UIActionButtonManager;

	private readonly videoConfProviderManager: AppVideoConfProviderManager;

	private readonly outboundCommunicationProviderManager: AppOutboundCommunicationProviderManager;

	private readonly signatureManager: AppSignatureManager;

	private readonly runtime: AppRuntimeManager;

	private readonly tempFilePath: string;

	private isLoaded: boolean;

	constructor({ metadataStorage, logStorage, bridges, sourceStorage, tempFilePath }: IAppManagerDeps) {
        /* Implementation Hidden */
    }

	/**
	 * Gets the path to the temporary file storage.
	 *
	 * Mainly used for upload events
	 */
	public getTempFilePath(): string {
        /* Implementation Hidden */
    }

	/** Gets the instance of the storage connector. */
	public getStorage(): AppMetadataStorage {
        /* Implementation Hidden */
    }

	/** Gets the instance of the log storage connector. */
	public getLogStorage(): AppLogStorage {
        /* Implementation Hidden */
    }

	/** Gets the instance of the App package parser. */
	public getParser(): AppPackageParser {
        /* Implementation Hidden */
    }

	/** Gets the compiler instance. */
	public getCompiler(): AppCompiler {
        /* Implementation Hidden */
    }

	/** Gets the accessor manager instance. */
	public getAccessorManager(): AppAccessorManager {
        /* Implementation Hidden */
    }

	/** Gets the instance of the Bridge manager. */
	public getBridges(): AppBridges {
        /* Implementation Hidden */
    }

	/** Gets the instance of the listener manager. */
	public getListenerManager(): AppListenerManager {
        /* Implementation Hidden */
    }

	/** Gets the command manager's instance. */
	public getCommandManager(): AppSlashCommandManager {
        /* Implementation Hidden */
    }

	public getVideoConfProviderManager(): AppVideoConfProviderManager {
        /* Implementation Hidden */
    }

	public getOutboundCommunicationProviderManager(): AppOutboundCommunicationProviderManager {
        /* Implementation Hidden */
    }

	public getLicenseManager(): AppLicenseManager {
        /* Implementation Hidden */
    }

	/** Gets the api manager's instance. */
	public getApiManager(): AppApiManager {
        /* Implementation Hidden */
    }

	/** Gets the external component manager's instance. */
	public getExternalComponentManager(): AppExternalComponentManager {
        /* Implementation Hidden */
    }

	/** Gets the manager of the settings, updates and getting. */
	public getSettingsManager(): AppSettingsManager {
        /* Implementation Hidden */
    }

	public getSchedulerManager(): AppSchedulerManager {
        /* Implementation Hidden */
    }

	public getUIActionButtonManager(): UIActionButtonManager {
        /* Implementation Hidden */
    }

	public getSignatureManager(): AppSignatureManager {
        /* Implementation Hidden */
    }

	public getRuntime(): AppRuntimeManager {
        /* Implementation Hidden */
    }

	/** Gets whether the Apps have been loaded or not. */
	public areAppsLoaded(): boolean {
        /* Implementation Hidden */
    }

	public setSourceStorage(storage: AppSourceStorage): void {
        /* Implementation Hidden */
    }

	/**
	 * Goes through the entire loading up process.
	 * Expect this to take some time, as it goes through a very
	 * long process of loading all the Apps up.
	 */
	public async load(): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async enableAll(): Promise<Array<AppFabricationFulfillment>> {
        /* Implementation Hidden */
    }

	public async unload(isManual: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	/** Gets the Apps which match the filter passed in. */
	public async get(filter?: IGetAppsFilter): Promise<ProxiedApp[]> {
        /* Implementation Hidden */
    }

	/** Gets a single App by the id passed in. */
	public getOneById(appId: string): ProxiedApp {
        /* Implementation Hidden */
    }

	public getPermissionsById(appId: string): Array<IPermission> {
        /* Implementation Hidden */
    }

	public async enable(id: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async disable(id: string, status: AppStatus = AppStatus.DISABLED, silent?: boolean): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async migrate(id: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async addLocal(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async add(appPackage: Buffer, installationParameters: IAppInstallParameters): Promise<AppFabricationFulfillment> {
        /* Implementation Hidden */
    }

	/**
	 * Uninstalls specified app from the server and remove
	 * all database records regarding it
	 *
	 * @returns the instance of the removed ProxiedApp
	 */
	public async remove(id: string, uninstallationParameters: IAppUninstallParameters): Promise<ProxiedApp> {
        /* Implementation Hidden */
    }

	/**
	 * Removes the app instance from the local Apps container
	 * and every type of data associated with it
	 */
	public async removeLocal(id: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async update(
		appPackage: Buffer,
		permissionsGranted: Array<IPermission>,
		updateOptions: { loadApp?: boolean; user?: IUser } = { loadApp: true },
	): Promise<AppFabricationFulfillment> {
        /* Implementation Hidden */
    }

	/**
	 * Updates the local instance of an app.
	 *
	 * If the second parameter is a Buffer of an app package,
	 * unpackage and instantiate the app's main class
	 *
	 * With an instance of a ProxiedApp, start it up and replace
	 * the reference in the local app collection
	 */
	async updateLocal(stored: IAppStorageItem, appPackageOrInstance: ProxiedApp | Buffer): Promise<ProxiedApp> {
        /* Implementation Hidden */
    }

	public async updateAndStartupLocal(stored: IAppStorageItem, appPackageOrInstance: ProxiedApp | Buffer, silenceStatus = true) {
        /* Implementation Hidden */
    }

	public async updateAndInitializeLocal(stored: IAppStorageItem, appPackageOrInstance: ProxiedApp | Buffer) {
        /* Implementation Hidden */
    }

	public getLanguageContent(): { [key: string]: object } {
        /* Implementation Hidden */
    }

	public async changeStatus(appId: string, status: AppStatus): Promise<ProxiedApp> {
        /* Implementation Hidden */
    }

	public async updateAppsMarketplaceInfo(appsOverview: Array<{ latest: IMarketplaceInfo }>): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Goes through the entire loading up process.
	 *
	 * @param appId the id of the application to load
	 */
	public async loadOne(appId: string, silenceStatus = false): Promise<ProxiedApp> {
        /* Implementation Hidden */
    }

	private async runStartUpProcess(storageItem: IAppStorageItem, app: ProxiedApp, silenceStatus: boolean): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async installApp(app: ProxiedApp, user: IUser): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async updateApp(app: ProxiedApp, user: IUser | null, oldAppVersion: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async initializeApp(app: ProxiedApp, silenceStatus = false): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async purgeAppConfig(app: ProxiedApp, opts: IPurgeAppConfigOpts = {}) {
        /* Implementation Hidden */
    }

	/**
	 * Determines if the App's required settings are set or not.
	 * Should a packageValue be provided and not empty, then it's considered set.
	 */
	private areRequiredSettingsSet(storageItem: IAppStorageItem): boolean {
        /* Implementation Hidden */
    }

	private async enableApp(app: ProxiedApp, silenceStatus = false): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async createAppUser(appInfo: IAppInfo): Promise<string> {
        /* Implementation Hidden */
    }

	private async removeAppUser(app: ProxiedApp): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async uninstallApp(app: ProxiedApp, user: IUser): Promise<boolean> {
        /* Implementation Hidden */
    }
}

export const getPermissionsByAppId = (appId: string) => {
    /* Implementation Hidden */
};

```