## File: apps/meteor/app/apps/server/bridges/videoConferences.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { VideoConferenceBridge } from '@rocket.chat/apps/dist/server/bridges/VideoConferenceBridge';
import type { IVideoConfProvider } from '@rocket.chat/apps-engine/definition/videoConfProviders';
import type { AppVideoConference, VideoConference } from '@rocket.chat/apps-engine/definition/videoConferences';
import { VideoConf } from '@rocket.chat/core-services';

import { videoConfProviders } from '../../../../server/lib/videoConfProviders';
import type { AppVideoConferencesConverter } from '../converters/videoConferences';

export class AppVideoConferenceBridge extends VideoConferenceBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async getById(callId: string, appId: string): Promise<VideoConference> {
        /* Implementation Hidden */
    }

	protected async create(call: AppVideoConference, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected async update(call: VideoConference, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async registerProvider(info: IVideoConfProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async unRegisterProvider(info: IVideoConfProvider): Promise<void> {
        /* Implementation Hidden */
    }
}

```