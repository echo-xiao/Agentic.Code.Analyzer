## File: packages/apps/src/server/accessors/VideoConferenceExtend.ts

```typescript
import type { IVideoConferenceExtender } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { IVideoConferenceUser, VideoConference } from '@rocket.chat/apps-engine/definition/videoConferences';
import type { VideoConferenceMember } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConference';

import { Utilities } from '../misc/Utilities';

export class VideoConferenceExtender implements IVideoConferenceExtender {
	public kind: RocketChatAssociationModel.VIDEO_CONFERENCE;

	constructor(private videoConference: VideoConference) {
        /* Implementation Hidden */
    }

	public setProviderData(value: Record<string, any>): IVideoConferenceExtender {
        /* Implementation Hidden */
    }

	public setStatus(value: VideoConference['status']): IVideoConferenceExtender {
        /* Implementation Hidden */
    }

	public setEndedBy(value: IVideoConferenceUser['_id']): IVideoConferenceExtender {
        /* Implementation Hidden */
    }

	public setEndedAt(value: VideoConference['endedAt']): IVideoConferenceExtender {
        /* Implementation Hidden */
    }

	public addUser(userId: VideoConferenceMember['_id'], ts?: VideoConferenceMember['ts']): IVideoConferenceExtender {
        /* Implementation Hidden */
    }

	public setDiscussionRid(rid: VideoConference['discussionRid']): IVideoConferenceExtender {
        /* Implementation Hidden */
    }

	public getVideoConference(): VideoConference {
        /* Implementation Hidden */
    }
}

```