## File: packages/apps/src/server/managers/AppApiManager.ts

```typescript
import { AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import { HttpStatusCode } from '@rocket.chat/apps-engine/definition/accessors';
import type { IApi, IApiEndpointMetadata, IApiRequest, IApiResponse } from '@rocket.chat/apps-engine/definition/api';

import type { AppManager } from '../AppManager';
import type { ApiBridge } from '../bridges';
import { PathAlreadyExistsError } from '../errors';
import type { AppAccessorManager } from './AppAccessorManager';
import { AppApi } from './AppApi';

/**
 * The api manager for the Apps.
 *
 * An App will add api's during their `initialize` method.
 * Then once an App's `onEnable` is called and it returns true,
 * only then will that App's api's be enabled.
 */
export class AppApiManager {
	private readonly bridge: ApiBridge;

	private readonly accessors: AppAccessorManager;

	// Variable that contains the api's which have been provided by apps.
	// The key of the top map is app id and the key of the inner map is the path
	private providedApis: Map<string, Map<string, AppApi>>;

	constructor(private readonly manager: AppManager) {
        /* Implementation Hidden */
    }

	/**
	 * Adds an to *be* registered. This will *not register* it with the
	 * bridged system yet as this is only called on an App's
	 * `initialize` method and an App might not get enabled.
	 * When adding an api, it can *not* already exist in the system.
	 *
	 * @param appId the app's id which the api belongs to
	 * @param api the api to add to the system
	 */
	public addApi(appId: string, api: IApi): void {
        /* Implementation Hidden */
    }

	/**
	 * Registers all of the api's for the provided app inside
	 * of the bridged system which then enables them.
	 *
	 * @param appId The app's id of which to register it's api's with the bridged system
	 */
	public async registerApis(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Unregisters the api's from the system.
	 *
	 * @param appId the appId for the api's to purge
	 */
	public async unregisterApis(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Executes an App's api.
	 *
	 * @param appId the app which is providing the api
	 * @param path the path to be executed in app's api's
	 * @param request the request data to be evaluated byt the app
	 */
	public async executeApi(appId: string, path: string, request: IApiRequest): Promise<IApiResponse> {
        /* Implementation Hidden */
    }

	/**
	 * Return a list of api's for a certain app
	 *
	 * @param appId the app which is providing the api
	 */
	public listApis(appId: string): Array<IApiEndpointMetadata> {
        /* Implementation Hidden */
    }

	/**
	 * Actually goes and provide's the bridged system with the api information.
	 *
	 * @param appId the app which is providing the api
	 * @param info the api's registration information
	 */
	private async registerApi(appId: string, api: AppApi): Promise<void> {
        /* Implementation Hidden */
    }
}

```