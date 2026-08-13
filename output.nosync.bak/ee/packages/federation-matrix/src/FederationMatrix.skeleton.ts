## File: ee/packages/federation-matrix/src/FederationMatrix.ts

```typescript
import { Authorization, type IFederationMatrixService, Room, ServiceClass, Settings } from '@rocket.chat/core-services';
import {
	isDeletedMessage,
	isMessageFromMatrixFederation,
	isQuoteAttachment,
	isRoomNativeFederated,
	isUserNativeFederated,
	UserStatus,
} from '@rocket.chat/core-typings';
import type { MessageQuoteAttachment, IMessage, IRoom, IUser, IRoomNativeFederated, ISubscription } from '@rocket.chat/core-typings';
import { eventIdSchema, roomIdSchema, userIdSchema, federationSDK, FederationRequestError } from '@rocket.chat/federation-sdk';
import type { EventID, FileMessageType, PresenceState } from '@rocket.chat/federation-sdk';
import { Logger } from '@rocket.chat/logger';
import { Users, Subscriptions, Messages, Rooms } from '@rocket.chat/models';
import emojione from 'emojione';

import { createOrUpdateFederatedUser } from './helpers/createOrUpdateFederatedUser';
import { extractDomainFromMatrixUserId } from './helpers/extractDomainFromMatrixUserId';
import { toExternalMessageFormat, toExternalQuoteMessageFormat } from './helpers/message.parsers';
import { validateFederatedUsername } from './helpers/validateFederatedUsername';
import { MatrixMediaService } from './services/MatrixMediaService';

export const fileTypes: Record<string, FileMessageType> = {
	image: 'm.image',
	video: 'm.video',
	audio: 'm.audio',
	file: 'm.file',
};

export class FederationMatrix extends ServiceClass implements IFederationMatrixService {
	protected name = 'federation-matrix';

	private serverName: string;

	private processEDUTyping: boolean;

	private processEDUPresence: boolean;

	private processEDUReceipt: boolean;

	private validateUserDomain: boolean;

	private readonly logger = new Logger(this.name);

	override async created(): Promise<void> {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }

	async createRoom(room: IRoom, owner: IUser): Promise<{ room_id: string; event_id: string }> {
        /* Implementation Hidden */
    }

	async ensureFederatedUsersExistLocally(usernames: string[]): Promise<void> {
        /* Implementation Hidden */
    }

	async createDirectMessageRoom(room: IRoom, members: IUser[], creatorId: IUser['_id']): Promise<void> {
        /* Implementation Hidden */
    }

	private getMatrixMessageType(mimeType?: string): FileMessageType {
        /* Implementation Hidden */
    }

	private async handleFileMessage(
		message: IMessage,
		matrixRoomId: string,
		matrixUserId: string,
		matrixDomain: string,
	): Promise<{ eventId: string } | null> {
        /* Implementation Hidden */
    }

	private async handleTextMessage(
		message: IMessage,
		matrixRoomId: string,
		matrixUserId: string,
		matrixDomain: string,
	): Promise<{ eventId: string } | null> {
        /* Implementation Hidden */
    }

	private async handleThreadedMessage(message: IMessage, matrixRoomId: string, matrixUserId: string, matrixDomain: string) {
        /* Implementation Hidden */
    }

	private async handleQuoteMessage(message: IMessage, matrixRoomId: string, matrixUserId: string, matrixDomain: string) {
        /* Implementation Hidden */
    }

	async sendMessage(message: IMessage, room: IRoomNativeFederated, user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	private async getQuoteMessage(
		message: IMessage,
		matrixRoomId: string,
		matrixUserId: string,
		matrixDomain: string,
	): Promise<{ formattedMessage: string; rawMessage: string; eventToReplyTo: string } | undefined> {
        /* Implementation Hidden */
    }

	async deleteMessage(matrixRoomId: string, message: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	async inviteUsersToRoom(room: IRoomNativeFederated, matrixUsersUsername: string[], inviter: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async sendReaction(messageId: string, reaction: string, user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async removeReaction(messageId: string, reaction: string, user: IUser, oldMessage: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	async getEventById(eventId: EventID) {
        /* Implementation Hidden */
    }

	async leaveRoom(roomId: string, user: IUser, kicker?: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async kickUser(room: IRoomNativeFederated, removedUser: IUser, userWhoRemoved: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async unbanUser(room: IRoomNativeFederated, unbannedUser: IUser, userWhoUnbanned: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async banUser(room: IRoomNativeFederated, bannedUser: IUser, userWhoBanned: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async updateMessage(room: IRoomNativeFederated, message: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	async updateRoomName(rid: string, displayName: string, user: IUser): Promise<void> {
        /* Implementation Hidden */
    }

	async updateRoomTopic(
		room: IRoomNativeFederated,
		topic: string,
		user: Pick<IUser, '_id' | 'username' | 'federation' | 'federated'>,
	): Promise<void> {
        /* Implementation Hidden */
    }

	async addUserRoleRoomScoped(
		room: IRoomNativeFederated,
		senderId: string,
		userId: string,
		role: 'moderator' | 'owner' | 'leader' | 'user',
	): Promise<void> {
        /* Implementation Hidden */
    }

	async notifyUserTyping(rid: string, user: string, isTyping: boolean) {
        /* Implementation Hidden */
    }

	async verifyMatrixIds(matrixIds: string[]): Promise<{ [key: string]: string }> {
        /* Implementation Hidden */
    }

	async handleInvite(roomId: IRoom['_id'], userId: IUser['_id'], action: 'accept' | 'reject'): Promise<void> {
        /* Implementation Hidden */
    }

	async canUserAccessFederation(user: IUser): Promise<boolean> {
        /* Implementation Hidden */
    }

	async notifyRoomRead({ room, userId, threadId }: { room: IRoomNativeFederated; userId: string; threadId?: string }): Promise<void> {
        /* Implementation Hidden */
    }

	// when a user changes their username, we need to send a new event for every room the user is a member
	async updateUserName(user: IUser): Promise<void> {
        /* Implementation Hidden */
    }
}

```