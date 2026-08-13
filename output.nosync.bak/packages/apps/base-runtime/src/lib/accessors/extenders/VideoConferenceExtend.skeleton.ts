## File: packages/apps/base-runtime/src/lib/accessors/extenders/VideoConferenceExtend.ts

```typescript
import type { IVideoConferenceExtender } from '@rocket.chat/apps-engine/definition/accessors/IVideoConferenceExtend';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/RocketChatAssociations';
import type { VideoConference, VideoConferenceMember } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConference';
import type { IVideoConferenceUser } from '@rocket.chat/apps-engine/definition/videoConferences/IVideoConferenceUser';

export class VideoConferenceExtender implements IVideoConferenceExtender {
	public kind: RocketChatAssociationModel.VIDEO_CONFERENCE;

	constructor(private videoConference: VideoConference) {
        /* Implementation Hidden */
    }

	public setProviderData(value: Record<string, unknown>): IVideoConferenceExtender {
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