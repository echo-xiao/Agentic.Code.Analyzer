## File: apps/meteor/server/services/video-conference/service.ts

```typescript
import { Apps } from '@rocket.chat/apps';
import type { AppVideoConfProviderManager } from '@rocket.chat/apps/dist/server/managers/AppVideoConfProviderManager';
import type { VideoConfData, VideoConfDataExtended } from '@rocket.chat/apps-engine/definition/videoConfProviders';
import type { IVideoConfService, VideoConferenceJoinOptions } from '@rocket.chat/core-services';
import { api, ServiceClassInternal, Room } from '@rocket.chat/core-services';
import type {
	IDirectVideoConference,
	ILivechatVideoConference,
	IRoom,
	IUser,
	VideoConferenceInstructions,
	DirectCallInstructions,
	ConferenceInstructions,
	LivechatInstructions,
	AtLeast,
	IGroupVideoConference,
	IVideoConferenceUser,
	IMessage,
	IStats,
	VideoConference,
	VideoConferenceCapabilities,
	VideoConferenceCreateData,
	Optional,
	ExternalVideoConference,
	IVoIPVideoConference,
} from '@rocket.chat/core-typings';
import {
	VideoConferenceStatus,
	isDirectVideoConference,
	isGroupVideoConference,
	isLivechatVideoConference,
} from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import type { InsertionModel } from '@rocket.chat/model-typings';
import { Users, VideoConference as VideoConferenceModel, Rooms, Messages, Subscriptions } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import { wrapExceptions } from '@rocket.chat/tools';
import type * as UiKit from '@rocket.chat/ui-kit';
import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';

import { RocketChatAssets } from '../../../app/assets/server';
import { notifyOnMessageChange } from '../../../app/lib/server/lib/notifyListener';
import { metrics } from '../../../app/metrics/server/lib/metrics';
import { Push } from '../../../app/push/server/push';
import PushNotification from '../../../app/push-notifications/server/lib/PushNotification';
import { settings } from '../../../app/settings/server';
import { updateCounter } from '../../../app/statistics/server/functions/updateStatsCounter';
import { getUserAvatarURL } from '../../../app/utils/server/getUserAvatarURL';
import { getUserPreference } from '../../../app/utils/server/lib/getUserPreference';
import { availabilityErrors } from '../../../lib/videoConference/constants';
import { readSecondaryPreferred } from '../../database/readSecondaryPreferred';
import { canAccessRoomIdAsync } from '../../lib/authorization/canAccessRoom';
import { callbacks } from '../../lib/callbacks';
import { i18n } from '../../lib/i18n';
import { isRoomCompatibleWithVideoConfRinging } from '../../lib/isRoomCompatibleWithVideoConfRinging';
import { sendMessage } from '../../lib/messages/sendMessage';
import { createRoom } from '../../lib/rooms/createRoom';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';
import { videoConfProviders } from '../../lib/videoConfProviders';
import { videoConfTypes } from '../../lib/videoConfTypes';

const { db } = MongoInternals.defaultRemoteCollectionDriver().mongo;

const logger = new Logger('VideoConference');

export class VideoConfService extends ServiceClassInternal implements IVideoConfService {
	protected name = 'video-conference';

	// VideoConference.create: Start a video conference using the type and provider specified as arguments
	public async create(
		{ type, rid, createdBy, providerName, ...data }: VideoConferenceCreateData,
		useAppUser = true,
	): Promise<VideoConferenceInstructions> {
        /* Implementation Hidden */
    }

	// VideoConference.start: Detect the desired type and provider then start a video conference using them
	public async start(
		caller: IUser['_id'],
		rid: string,
		{ title, allowRinging }: { title?: string; allowRinging?: boolean },
	): Promise<VideoConferenceInstructions> {
        /* Implementation Hidden */
    }

	public async join(uid: IUser['_id'] | undefined, callId: VideoConference['_id'], options: VideoConferenceJoinOptions): Promise<string> {
        /* Implementation Hidden */
    }

	public async getInfo(callId: VideoConference['_id'], uid: IUser['_id'] | undefined): Promise<UiKit.ModalSurfaceLayout> {
        /* Implementation Hidden */
    }

	public async cancel(uid: IUser['_id'], callId: VideoConference['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	public async get(callId: VideoConference['_id']): Promise<Omit<VideoConference, 'providerData'> | null> {
        /* Implementation Hidden */
    }

	public async getUnfiltered(callId: VideoConference['_id']): Promise<VideoConference | null> {
        /* Implementation Hidden */
    }

	public async list(
		roomId: IRoom['_id'],
		pagination: { offset?: number; count?: number } = {},
	): Promise<PaginatedResult<{ data: VideoConference[] }>> {
        /* Implementation Hidden */
    }

	public async setProviderData(callId: VideoConference['_id'], data: VideoConference['providerData'] | undefined): Promise<void> {
        /* Implementation Hidden */
    }

	public async setEndedBy(callId: VideoConference['_id'], endedBy: IUser['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	public async setEndedAt(callId: VideoConference['_id'], endedAt: Date): Promise<void> {
        /* Implementation Hidden */
    }

	public async setStatus(callId: VideoConference['_id'], status: VideoConference['status']): Promise<void> {
        /* Implementation Hidden */
    }

	public async addUser(callId: VideoConference['_id'], userId?: IUser['_id'], ts?: Date): Promise<void> {
        /* Implementation Hidden */
    }

	public async listProviders(): Promise<{ key: string; label: string }[]> {
        /* Implementation Hidden */
    }

	public async listProviderCapabilities(providerName: string): Promise<VideoConferenceCapabilities> {
        /* Implementation Hidden */
    }

	public async listCapabilities(): Promise<{ providerName: string; capabilities: VideoConferenceCapabilities }> {
        /* Implementation Hidden */
    }

	public async declineLivechatCall(callId: VideoConference['_id']): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async diagnoseProvider(uid: string, rid: string, providerName?: string): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	public async getStatistics(): Promise<IStats['videoConf']> {
        /* Implementation Hidden */
    }

	public async validateAction(
		action: string,
		caller: IUser['_id'],
		{ callId, uid, rid }: { callId: VideoConference['_id']; uid: IUser['_id']; rid: IRoom['_id'] },
	): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async createVoIP(data: InsertionModel<IVoIPVideoConference>): Promise<IVoIPVideoConference['_id'] | undefined> {
        /* Implementation Hidden */
    }

	private notifyUser(
		userId: IUser['_id'],
		action: string,
		params: { uid: IUser['_id']; rid: IRoom['_id']; callId: VideoConference['_id'] },
	): void {
        /* Implementation Hidden */
    }

	private notifyVideoConfUpdate(rid: IRoom['_id'], callId: VideoConference['_id']): void {
        /* Implementation Hidden */
    }

	private async endCall(callId: VideoConference['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private async expireCall(callId: VideoConference['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private async endDirectCall(call: IDirectVideoConference): Promise<void> {
        /* Implementation Hidden */
    }

	private async getTypeForNewVideoConference(
		rid: IRoom['_id'],
		allowRinging: boolean,
	): Promise<AtLeast<VideoConferenceCreateData, 'type'>> {
        /* Implementation Hidden */
    }

	private async createMessage(call: VideoConference, createdBy?: IUser, customBlocks?: IMessage['blocks']): Promise<IMessage['_id']> {
        /* Implementation Hidden */
    }

	private async validateProvider(providerName: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async getValidatedProvider(): Promise<string> {
        /* Implementation Hidden */
    }

	private async createEphemeralMessage(uid: string, rid: string, i18nKey: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async createLivechatMessage(call: ILivechatVideoConference, user: IUser, url: string): Promise<IMessage['_id']> {
        /* Implementation Hidden */
    }

	private buildVideoConfBlock(callId: string): UiKit.MessageSurfaceLayout[number] {
        /* Implementation Hidden */
    }

	private buildMessageBlock(text: string): UiKit.MessageSurfaceLayout[number] {
        /* Implementation Hidden */
    }

	private async sendPushNotification(
		call: AtLeast<IDirectVideoConference, 'createdBy' | 'rid' | '_id' | 'status'>,
		calleeId: IUser['_id'],
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async sendAllPushNotifications(callId: VideoConference['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private async startDirect(
		providerName: string,
		user: IUser,
		{ _id: rid, uids }: AtLeast<IRoom, '_id' | 'uids'>,
		extraData?: Partial<IDirectVideoConference>,
	): Promise<DirectCallInstructions> {
        /* Implementation Hidden */
    }

	private async notifyUsersOfRoom(
		rid: IRoom['_id'],
		uid: IUser['_id'],
		action: string,
		params: { uid: IUser['_id']; rid: IRoom['_id']; callId: VideoConference['_id'] },
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async startGroup(
		providerName: string,
		user: IUser,
		rid: IRoom['_id'],
		title: string,
		extraData?: Partial<IGroupVideoConference>,
		useAppUser = true,
	): Promise<ConferenceInstructions> {
        /* Implementation Hidden */
    }

	private async startLivechat(providerName: string, user: IUser, rid: IRoom['_id']): Promise<LivechatInstructions> {
        /* Implementation Hidden */
    }

	private async joinCall(
		call: ExternalVideoConference,
		user: AtLeast<IUser, '_id' | 'username' | 'name' | 'avatarETag'> | undefined,
		options: VideoConferenceJoinOptions,
	): Promise<string> {
        /* Implementation Hidden */
    }

	private async getProviderManager(): Promise<AppVideoConfProviderManager> {
        /* Implementation Hidden */
    }

	private async getRoomName(rid: string): Promise<string> {
        /* Implementation Hidden */
    }

	private async generateNewUrl(call: ExternalVideoConference): Promise<string> {
        /* Implementation Hidden */
    }

	private async getCallTitleForUser(call: VideoConference, userId?: IUser['_id']): Promise<string> {
        /* Implementation Hidden */
    }

	private async getCallTitle(call: VideoConference): Promise<string> {
        /* Implementation Hidden */
    }

	private async getUrl(
		call: ExternalVideoConference,
		user?: AtLeast<IUser, '_id' | 'username' | 'name'>,
		options: VideoConferenceJoinOptions = {},
	): Promise<string> {
        /* Implementation Hidden */
    }

	private async runNewVideoConferenceEvent(callId: VideoConference['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private async runVideoConferenceChangedEvent(callId: VideoConference['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private async runOnUserJoinEvent(callId: VideoConference['_id'], user?: IVideoConferenceUser): Promise<void> {
        /* Implementation Hidden */
    }

	private async addUserToCall(
		call: Optional<VideoConference, 'providerData'>,
		{ _id, username, name, avatarETag, ts }: AtLeast<Required<IUser>, '_id' | 'username' | 'name' | 'avatarETag'> & { ts?: Date },
	): Promise<void> {
        /* Implementation Hidden */
    }

	private async addAnonymousUser(call: Optional<IGroupVideoConference, 'providerData'>): Promise<void> {
        /* Implementation Hidden */
    }

	private async updateDirectCall(call: IDirectVideoConference, newUserId: IUser['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private isPersistentChatEnabled(): boolean {
        /* Implementation Hidden */
    }

	private async maybeCreateDiscussion(callId: VideoConference['_id'], createdBy?: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	private async getRoomForDiscussion(
		baseRoom: IRoom['_id'],
		childRoomIds: IRoom['_id'][] = [],
	): Promise<Pick<IRoom, '_id' | 't' | 'teamId' | 'prid'>> {
        /* Implementation Hidden */
    }

	private async createDiscussionForConference(
		name: string,
		call: AtLeast<VideoConference, '_id' | 'rid' | 'createdBy'>,
		createdBy?: IUser,
	): Promise<void> {
        /* Implementation Hidden */
    }

	public async assignDiscussionToConference(callId: VideoConference['_id'], rid: IRoom['_id'] | undefined): Promise<void> {
        /* Implementation Hidden */
    }

	private async addUserToDiscussion(rid: IRoom['_id'], uid: IUser['_id']): Promise<void> {
        /* Implementation Hidden */
    }
}

```