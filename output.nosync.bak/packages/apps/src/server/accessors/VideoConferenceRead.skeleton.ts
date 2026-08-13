## File: packages/apps/src/server/accessors/VideoConferenceRead.ts

```typescript
import type { IVideoConferenceRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { VideoConference } from '@rocket.chat/apps-engine/definition/videoConferences';

import type { VideoConferenceBridge } from '../bridges';

export class VideoConferenceRead implements IVideoConferenceRead {
	constructor(
		private videoConfBridge: VideoConferenceBridge,
		private appId: string,
	) {
        /* Implementation Hidden */
    }

	public getById(id: string): Promise<VideoConference> {
        /* Implementation Hidden */
    }
}

```