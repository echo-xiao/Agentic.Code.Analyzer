## File: packages/apps/src/server/managers/AppVideoConfProviderManager.ts

```typescript
import type { IBlock } from '@rocket.chat/apps-engine/definition/uikit';
import type {
	IVideoConferenceOptions,
	IVideoConfProvider,
	VideoConfData,
	VideoConfDataExtended,
} from '@rocket.chat/apps-engine/definition/videoConfProviders';
import type { VideoConference } from '@rocket.chat/apps-engine/definition/videoConferences';
import type { IVideoConferenceUser } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConferenceUser';

import type { AppManager } from '../AppManager';
import type { VideoConferenceBridge } from '../bridges';
import { VideoConfProviderAlreadyExistsError, VideoConfProviderNotRegisteredError } from '../errors';
import type { AppAccessorManager } from './AppAccessorManager';
import { AppPermissionManager } from './AppPermissionManager';
import { AppVideoConfProvider } from './AppVideoConfProvider';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissions } from '../permissions/AppPermissions';

export class AppVideoConfProviderManager {
	private readonly accessors: AppAccessorManager;

	private readonly bridge: VideoConferenceBridge;

	private videoConfProviders: Map<string, Map<string, AppVideoConfProvider>>;

	private providerApps: Map<IVideoConfProvider['name'], string>;

	constructor(private readonly manager: AppManager) {
        /* Implementation Hidden */
    }

	public canProviderBeTouchedBy(appId: string, providerName: string): boolean {
        /* Implementation Hidden */
    }

	public isAlreadyDefined(providerName: string): boolean {
        /* Implementation Hidden */
    }

	public addProvider(appId: string, provider: IVideoConfProvider): void {
        /* Implementation Hidden */
    }

	public async registerProviders(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async unregisterProviders(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async isFullyConfigured(providerName: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async onNewVideoConference(providerName: string, call: VideoConference): Promise<void> {
        /* Implementation Hidden */
    }

	public async onVideoConferenceChanged(providerName: string, call: VideoConference): Promise<void> {
        /* Implementation Hidden */
    }

	public async onUserJoin(providerName: string, call: VideoConference, user?: IVideoConferenceUser): Promise<void> {
        /* Implementation Hidden */
    }

	public async getVideoConferenceInfo(
		providerName: string,
		call: VideoConference,
		user?: IVideoConferenceUser,
	): Promise<Array<IBlock> | undefined> {
        /* Implementation Hidden */
    }

	public async generateUrl(providerName: string, call: VideoConfData): Promise<string> {
        /* Implementation Hidden */
    }

	public async customizeUrl(
		providerName: string,
		call: VideoConfDataExtended,
		user?: IVideoConferenceUser,
		options?: IVideoConferenceOptions,
	): Promise<string> {
        /* Implementation Hidden */
    }

	private retrieveProviderInfo(providerName: string): AppVideoConfProvider | undefined {
        /* Implementation Hidden */
    }

	private linkAppProvider(appId: string, providerName: string): void {
        /* Implementation Hidden */
    }

	private async registerProvider(appId: string, info: AppVideoConfProvider): Promise<void> {
        /* Implementation Hidden */
    }

	private async unregisterProvider(appId: string, info: AppVideoConfProvider): Promise<void> {
        /* Implementation Hidden */
    }
}

```