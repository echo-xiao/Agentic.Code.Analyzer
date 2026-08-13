## File: packages/apps/src/server/bridges/VideoConferenceBridge.ts

```typescript
import type { IVideoConfProvider } from '@rocket.chat/apps-engine/definition/videoConfProviders';
import type { AppVideoConference } from '@rocket.chat/apps-engine/definition/videoConferences/AppVideoConference';
import type { VideoConference } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConference';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class VideoConferenceBridge extends BaseBridge {
	public async doGetById(callId: string, appId: string): Promise<VideoConference> {
        /* Implementation Hidden */
    }

	public async doCreate(call: AppVideoConference, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public async doUpdate(call: VideoConference, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doRegisterProvider(info: IVideoConfProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doUnRegisterProvider(info: IVideoConfProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract create(call: AppVideoConference, appId: string): Promise<string>;

	protected abstract getById(callId: string, appId: string): Promise<VideoConference>;

	protected abstract update(call: VideoConference, appId: string): Promise<void>;

	protected abstract registerProvider(info: IVideoConfProvider, appId: string): Promise<void>;

	protected abstract unRegisterProvider(info: IVideoConfProvider, appId: string): Promise<void>;

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasProviderPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```