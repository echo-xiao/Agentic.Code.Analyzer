## File: packages/apps/tests/test-data/bridges/videoConferenceBridge.ts

```typescript
import type { IVideoConfProvider } from '@rocket.chat/apps-engine/definition/videoConfProviders';
import type { VideoConference, AppVideoConference } from '@rocket.chat/apps-engine/definition/videoConferences';

import { VideoConferenceBridge } from '../../../src/server/bridges';

export class TestsVideoConferenceBridge extends VideoConferenceBridge {
	public getById(callId: string, appId: string): Promise<VideoConference> {
        /* Implementation Hidden */
    }

	public create(call: AppVideoConference, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public update(call: VideoConference, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected registerProvider(info: IVideoConfProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected unRegisterProvider(info: IVideoConfProvider, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```