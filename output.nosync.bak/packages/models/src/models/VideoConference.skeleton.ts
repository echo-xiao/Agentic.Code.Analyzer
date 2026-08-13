## File: packages/models/src/models/VideoConference.ts

```typescript
import type {
	VideoConference,
	IGroupVideoConference,
	ILivechatVideoConference,
	IUser,
	IRoom,
	RocketChatRecordDeleted,
	IVoIPVideoConference,
} from '@rocket.chat/core-typings';
import { VideoConferenceStatus } from '@rocket.chat/core-typings';
import type { FindPaginated, InsertionModel, IVideoConferenceModel } from '@rocket.chat/model-typings';
import type {
	FindCursor,
	UpdateOptions,
	UpdateFilter,
	UpdateResult,
	IndexDescription,
	Collection,
	Db,
	CountDocumentsOptions,
} from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class VideoConferenceRaw extends BaseRaw<VideoConference> implements IVideoConferenceModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<VideoConference>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	public findPaginatedByRoomId(
		rid: IRoom['_id'],
		{ offset, count }: { offset?: number; count?: number } = {},
	): FindPaginated<FindCursor<VideoConference>> {
        /* Implementation Hidden */
    }

	public async findAllLongRunning(minDate: Date): Promise<FindCursor<Pick<VideoConference, '_id'>>> {
        /* Implementation Hidden */
    }

	public async countByTypeAndStatus(
		type: VideoConference['type'],
		status: VideoConferenceStatus,
		options: CountDocumentsOptions,
	): Promise<number> {
        /* Implementation Hidden */
    }

	public async createDirect({
		providerName,
		...callDetails
	}: Pick<VideoConference, 'rid' | 'createdBy' | 'providerName'>): Promise<string> {
        /* Implementation Hidden */
    }

	public async createGroup({
		providerName,
		...callDetails
	}: Required<Pick<IGroupVideoConference, 'rid' | 'title' | 'createdBy' | 'providerName' | 'ringing'>>): Promise<string> {
        /* Implementation Hidden */
    }

	public async createLivechat({
		providerName,
		...callDetails
	}: Required<Pick<ILivechatVideoConference, 'rid' | 'createdBy' | 'providerName'>>): Promise<string> {
        /* Implementation Hidden */
    }

	public async createVoIP(call: InsertionModel<IVoIPVideoConference>): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	public updateOneById(
		_id: string,
		update: UpdateFilter<VideoConference> | Partial<VideoConference>,
		options?: UpdateOptions,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async setEndedById(callId: string, endedBy?: { _id: string; name: string; username: string }, endedAt?: Date): Promise<void> {
        /* Implementation Hidden */
    }

	public async setDataById(callId: string, data: Partial<Omit<VideoConference, '_id'>>): Promise<void> {
        /* Implementation Hidden */
    }

	public async setRingingById(callId: string, ringing: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	public async setStatusById(callId: string, status: VideoConference['status']): Promise<void> {
        /* Implementation Hidden */
    }

	public async setUrlById(callId: string, url: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async setProviderDataById(callId: string, providerData: Record<string, any> | undefined): Promise<void> {
        /* Implementation Hidden */
    }

	public async addUserById(
		callId: string,
		user: Required<Pick<IUser, '_id' | 'name' | 'username' | 'avatarETag'>> & { ts?: Date },
	): Promise<void> {
        /* Implementation Hidden */
    }

	public async setMessageById(callId: string, messageType: keyof VideoConference['messages'], messageId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async updateUserReferences(userId: IUser['_id'], username: IUser['username'], name: IUser['name']): Promise<void> {
        /* Implementation Hidden */
    }

	public async increaseAnonymousCount(callId: IGroupVideoConference['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	public async setDiscussionRidById(callId: string, discussionRid: IRoom['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	public async unsetDiscussionRidById(callId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async unsetDiscussionRid(discussionRid: IRoom['_id']): Promise<void> {
        /* Implementation Hidden */
    }
}

```