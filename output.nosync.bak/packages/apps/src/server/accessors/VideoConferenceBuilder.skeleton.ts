## File: packages/apps/src/server/accessors/VideoConferenceBuilder.ts

```typescript
import type { IVideoConferenceBuilder } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { AppVideoConference } from '@rocket.chat/apps-engine/definition/videoConferences';

export class VideoConferenceBuilder implements IVideoConferenceBuilder {
	public kind: RocketChatAssociationModel.VIDEO_CONFERENCE = RocketChatAssociationModel.VIDEO_CONFERENCE;

	protected call: AppVideoConference;

	constructor(data?: Partial<AppVideoConference>) {
        /* Implementation Hidden */
    }

	public setData(data: Partial<AppVideoConference>): IVideoConferenceBuilder {
        /* Implementation Hidden */
    }

	public setRoomId(rid: string): IVideoConferenceBuilder {
        /* Implementation Hidden */
    }

	public getRoomId(): string {
        /* Implementation Hidden */
    }

	public setCreatedBy(userId: string): IVideoConferenceBuilder {
        /* Implementation Hidden */
    }

	public getCreatedBy(): string {
        /* Implementation Hidden */
    }

	public setProviderName(userId: string): IVideoConferenceBuilder {
        /* Implementation Hidden */
    }

	public getProviderName(): string {
        /* Implementation Hidden */
    }

	public setProviderData(data: Record<string, any> | undefined): IVideoConferenceBuilder {
        /* Implementation Hidden */
    }

	public getProviderData(): Record<string, any> | undefined {
        /* Implementation Hidden */
    }

	public setTitle(userId: string): IVideoConferenceBuilder {
        /* Implementation Hidden */
    }

	public getTitle(): string {
        /* Implementation Hidden */
    }

	public setDiscussionRid(rid: AppVideoConference['discussionRid']): IVideoConferenceBuilder {
        /* Implementation Hidden */
    }

	public getDiscussionRid(): AppVideoConference['discussionRid'] {
        /* Implementation Hidden */
    }

	public getVideoConference(): AppVideoConference {
        /* Implementation Hidden */
    }
}

```