## File: packages/models/src/models/Messages.ts

```typescript
import type {
	ILivechatDepartment,
	IMessage,
	IRoom,
	IUser,
	MessageTypesValues,
	RocketChatRecordDeleted,
	MessageAttachment,
	IMessageWithPendingFileImport,
	DeepWritable,
} from '@rocket.chat/core-typings';
import type { FindPaginated, IMessagesModel } from '@rocket.chat/model-typings';
import type { PaginatedRequest } from '@rocket.chat/rest-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type {
	AggregationCursor,
	Collection,
	CountDocumentsOptions,
	AggregateOptions,
	FindCursor,
	Db,
	Filter,
	FindOptions,
	IndexDescription,
	InsertOneResult,
	DeleteResult,
	UpdateResult,
	Document,
	UpdateFilter,
	WithId,
} from 'mongodb';

import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';

export class MessagesRaw extends BaseRaw<IMessage> implements IMessagesModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IMessage>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findVisibleByMentionAndRoomId(username: IUser['username'], rid: IRoom['_id'], options?: FindOptions<IMessage>): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findPaginatedVisibleByMentionAndRoomId(
		username: IUser['username'],
		rid: IRoom['_id'],
		options?: FindOptions<IMessage>,
	): FindPaginated<FindCursor<IMessage>> {
        /* Implementation Hidden */
    }

	findStarredByUserAtRoom(
		userId: IUser['_id'],
		roomId: IRoom['_id'],
		options?: FindOptions<IMessage>,
	): FindPaginated<FindCursor<IMessage>> {
        /* Implementation Hidden */
    }

	findPaginatedByRoomIdAndType(
		roomId: IRoom['_id'],
		type: IMessage['t'],
		options: FindOptions<IMessage> = {},
	): FindPaginated<FindCursor<IMessage>> {
        /* Implementation Hidden */
    }

	findDiscussionsByRoomAndText(rid: IRoom['_id'], text: string, options?: FindOptions<IMessage>): FindPaginated<FindCursor<IMessage>> {
        /* Implementation Hidden */
    }

	findAllNumberOfTransferredRooms({
		start,
		end,
		departmentId,
		onlyCount,
		options,
	}: {
		start: Date;
		end: Date;
		departmentId?: ILivechatDepartment['_id'];
		onlyCount: true;
		options?: PaginatedRequest;
	}): AggregationCursor<{ total: number }>;

	findAllNumberOfTransferredRooms({
		start,
		end,
		departmentId,
		onlyCount,
		options,
	}: {
		start: Date;
		end: Date;
		departmentId?: ILivechatDepartment['_id'];
		onlyCount?: false;
		options?: PaginatedRequest;
	}): AggregationCursor<{ _id: string | null; numberOfTransferredRooms: number }>;

	findAllNumberOfTransferredRooms({
		start,
		end,
		departmentId,
		onlyCount = false,
		options = {},
	}: {
		start: Date;
		end: Date;
		departmentId?: ILivechatDepartment['_id'];
		onlyCount?: boolean;
		options?: PaginatedRequest;
	}): AggregationCursor<{ total: number }> | AggregationCursor<{ _id: string | null; numberOfTransferredRooms: number }> {
        /* Implementation Hidden */
    }

	getTotalOfMessagesSentByDate({ start, end, options = {} }: { start: Date; end: Date; options?: PaginatedRequest }): Promise<any[]> {
        /* Implementation Hidden */
    }

	findLivechatClosedMessages(rid: IRoom['_id'], searchTerm?: string, options?: FindOptions<IMessage>): FindPaginated<FindCursor<IMessage>> {
        /* Implementation Hidden */
    }

	findLivechatClosingMessage(rid: IRoom['_id'], options?: FindOptions<IMessage>): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	findVisibleByRoomIdNotContainingTypesBeforeTs(
		roomId: IRoom['_id'],
		types: IMessage['t'][],
		ts: Date,
		showSystemMessages: boolean,
		options?: FindOptions<IMessage>,
		showThreadMessages = true,
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findLivechatMessagesWithoutTypes(
		rid: IRoom['_id'],
		ignoredTypes: IMessage['t'][],
		showSystemMessages: boolean,
		options?: FindOptions<IMessage>,
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	async setBlocksById(_id: string, blocks: Required<IMessage>['blocks']): Promise<void> {
        /* Implementation Hidden */
    }

	async countRoomsWithStarredMessages(options: AggregateOptions): Promise<number> {
        /* Implementation Hidden */
    }

	async countRoomsWithMessageType(type: IMessage['t'], options: AggregateOptions): Promise<number> {
        /* Implementation Hidden */
    }

	async countByType(type: IMessage['t'], options: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	async countRoomsWithPinnedMessages(options: AggregateOptions): Promise<number> {
        /* Implementation Hidden */
    }

	countPinned(options?: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	findPaginatedPinnedByRoom(roomId: IMessage['rid'], options?: FindOptions<IMessage>): FindPaginated<FindCursor<IMessage>> {
        /* Implementation Hidden */
    }

	countStarred(options?: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	async setFederationReactionEventId(username: string, _id: string, reaction: string, federationEventId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async unsetFederationReactionEventId(federationEventId: string, _id: string, reaction: string): Promise<void> {
        /* Implementation Hidden */
    }

	async findOneByFederationId(federationEventId: string): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	async findLatestFederationThreadMessageByTmid(tmid: string, messageId: IMessage['_id']): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	async setFederationEventIdById(_id: string, federationEventId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async findOneByFederationIdAndUsernameOnReactions(federationEventId: string, username: string): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	removeByRoomId(roomId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	setReactions(messageId: string, reactions: IMessage['reactions']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	keepHistoryForToken(token: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setRoomIdByToken(token: string, rid: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	unsetReactions(messageId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	addTranslations(messageId: string, translations: Record<string, string>, providerName: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	addAttachmentTranslations(messageId: string, attachmentIndex: string, translations: Record<string, string>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setImportFileRocketChatAttachment(
		importFileId: string,
		rocketChatUrl: string,
		attachment: MessageAttachment,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	countVisibleByRoomIdBetweenTimestampsInclusive(roomId: string, afterTimestamp: Date, beforeTimestamp: Date): Promise<number> {
        /* Implementation Hidden */
    }

	// FIND
	findByMention(username: string, options?: FindOptions<IMessage>): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findFilesByUserId(userId: string, options: FindOptions<IMessage> = {}): FindCursor<Pick<IMessage, 'file' | 'files'>> {
        /* Implementation Hidden */
    }

	findFilesByRoomIdPinnedTimestampAndUsers(
		rid: string,
		excludePinned: boolean,
		ignoreDiscussion = true,
		ts: Filter<IMessage>['ts'],
		users: string[] = [],
		ignoreThreads = true,
		options: FindOptions<IMessage> = {},
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findDiscussionByRoomIdPinnedTimestampAndUsers(
		rid: string,
		excludePinned: boolean,
		ts: Filter<IMessage>['ts'],
		users: string[] = [],
		options: FindOptions<IMessage> = {},
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findVisibleByRoomId<T extends IMessage = IMessage>(rid: string, options?: FindOptions<T>): FindCursor<T> {
        /* Implementation Hidden */
    }

	findVisibleByIds(ids: string[], options?: FindOptions<IMessage>): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findVisibleThreadByThreadId(tmid: string, options?: FindOptions<IMessage>): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findVisibleByRoomIdNotContainingTypes(
		roomId: string,
		types: MessageTypesValues[],
		options?: FindOptions<IMessage>,
		showThreadMessages = true,
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findVisibleByRoomIdAfterTimestamp(
		roomId: string,
		timestamp: Date,
		showThreadMessages = true,
		options?: FindOptions<IMessage>,
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findForUpdates(roomId: IMessage['rid'], timestamp: { $lt: Date } | { $gt: Date }, options?: FindOptions<IMessage>): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findVisibleByRoomIdBeforeTimestamp(
		roomId: string,
		timestamp: Date,
		showThreadMessages = true,
		options?: FindOptions<IMessage>,
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findVisibleByRoomIdBeforeTimestampNotContainingTypes(
		roomId: string,
		timestamp: Date,
		types: MessageTypesValues[],
		options?: FindOptions<IMessage>,
		showThreadMessages = true,
		inclusive = false,
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findVisibleByRoomIdBetweenTimestampsNotContainingTypes(
		roomId: string,
		afterTimestamp: Date,
		beforeTimestamp: Date,
		types: MessageTypesValues[],
		options: FindOptions<IMessage> = {},
		showThreadMessages = true,
		inclusive = false,
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	countVisibleByRoomIdBetweenTimestampsNotContainingTypes(
		roomId: string,
		afterTimestamp: Date,
		beforeTimestamp: Date,
		types: MessageTypesValues[],
		showThreadMessages = true,
		inclusive = false,
	): Promise<number> {
        /* Implementation Hidden */
    }

	async getLastTimestamp(options: FindOptions<IMessage> = { projection: { _id: 0, ts: 1 } }): Promise<Date | undefined> {
        /* Implementation Hidden */
    }

	findByRoomIdAndMessageIds(rid: string, messageIds: string[], options?: FindOptions<IMessage>): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findOneBySlackBotIdAndSlackTs(slackBotId: string, slackTs: Date): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	findOneBySlackTs(slackTs: Date): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	findOneByRoomIdAndMessageId(rid: string, messageId: string, options?: FindOptions<IMessage>): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	getLastVisibleUserMessageSentByRoomId(rid: string, messageId?: string): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	async cloneAndSaveAsHistoryByRecord(record: IMessage, user: IMessage['u']): Promise<InsertOneResult<IMessage>> {
        /* Implementation Hidden */
    }

	async cloneAndSaveAsHistoryById(_id: string, user: IMessage['u']): Promise<InsertOneResult<IMessage>> {
        /* Implementation Hidden */
    }

	// UPDATE
	setHiddenById(_id: string, hidden: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setHiddenByIds(ids: string[], hidden: boolean): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	setAsDeletedByIdAndUser(_id: string, user: IMessage['u']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setAsDeletedByIdsAndUser(ids: string[], user: IMessage['u']): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	setPinnedByIdAndUserId(
		_id: string,
		pinnedBy: Pick<IUser, '_id' | 'username'> | undefined,
		pinned?: boolean,
		pinnedAt?: Date,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setUrlsById(_id: string, urls: NonNullable<IMessage['urls']>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateAllUsernamesByUserId(userId: string, username: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateUsernameOfEditByUserId(userId: string, username: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateUsernameAndMessageOfMentionByIdAndOldUsername(
		_id: string,
		oldUsername: string,
		newUsername: string,
		newMessage: string,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateUserStarById(_id: string, userId: string, starred?: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setMessageAttachments(_id: string, attachments: IMessage['attachments']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setSlackBotIdAndSlackTs(_id: string, slackBotId: string, slackTs: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unlinkUserId(userId: string, newUserId: string, newUsername: string, newNameAlias: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setReceiptsArchivedById(ids: string[], archived: boolean): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	// INSERT

	async createWithTypeRoomIdMessageUserAndUnread(
		type: MessageTypesValues,
		rid: string,
		message: string,
		user: Pick<IMessage['u'], '_id' | 'username' | 'name'>,
		unread?: boolean,
		extraData?: Partial<IMessage>,
	): Promise<InsertOneResult<IMessage>> {
        /* Implementation Hidden */
    }

	// REMOVE

	removeByRoomIds(rids: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	findThreadsByRoomIdPinnedTimestampAndUsers(
		{
			rid,
			pinned,
			ignoreDiscussion = true,
			ts,
			users = [],
		}: { rid: string; pinned: boolean; ignoreDiscussion?: boolean; ts: Filter<IMessage>['ts']; users: string[] },
		options?: FindOptions<IMessage>,
	): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	async findByIdPinnedTimestampLimitAndUsers(
		rid: string,
		ignorePinned: boolean,
		ignoreDiscussion = true,
		ts: Filter<IMessage>['ts'],
		limit: number,
		users: string[] = [],
		ignoreThreads = true,
	): Promise<string[]> {
        /* Implementation Hidden */
    }

	async removeByIdPinnedTimestampLimitAndUsers(
		rid: string,
		ignorePinned: boolean,
		ignoreDiscussion = true,
		ts: Filter<IMessage>['ts'],
		limit: number,
		users: string[] = [],
		ignoreThreads = true,
		selectedMessageIds: string[] = [],
	): Promise<number> {
        /* Implementation Hidden */
    }

	removeByUserId(userId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	getMessageByFileId(fileID: string): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	getMessageByFileIdAndUsername(fileID: string, userId: string): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	setVisibleMessagesAsRead(rid: string, until: Date): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setThreadMessagesAsRead(rid: string, tmid: string, until: Date): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setAsReadById(_id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findVisibleUnreadMessagesByRoomAndDate(rid: string, after: Date): FindCursor<Pick<IMessage, '_id' | 't' | 'pinned' | 'drid' | 'tmid'>> {
        /* Implementation Hidden */
    }

	findUnreadThreadMessagesByDate(
		rid: string,
		tmid: string,
		userId: string,
		after: Date,
	): FindCursor<Pick<IMessage, '_id' | 't' | 'pinned' | 'drid' | 'tmid'>> {
        /* Implementation Hidden */
    }

	/**
	 * Copy metadata from the discussion to the system message in the parent channel
	 * which links to the discussion.
	 * Since we don't pass this metadata into the model's function, it is not a subject
	 * to race conditions: If multiple updates occur, the current state will be updated
	 * only if the new state of the discussion room is really newer.
	 */
	async refreshDiscussionMetadata(room: Pick<IRoom, '_id' | 'msgs' | 'lm'>): Promise<null | WithId<IMessage>> {
        /* Implementation Hidden */
    }

	// //////////////////////////////////////////////////////////////////
	// threads

	countThreads(): Promise<number> {
        /* Implementation Hidden */
    }

	updateRepliesByThreadId(tmid: string, replies: string[], ts: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async getThreadFollowsByThreadId(tmid: string): Promise<string[] | undefined> {
        /* Implementation Hidden */
    }

	addThreadFollowerByThreadId(tmid: string, userId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	removeThreadFollowerByThreadId(tmid: string, userId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findThreadsByRoomId(rid: string, skip: number, limit: number): FindCursor<IMessage> {
        /* Implementation Hidden */
    }

	findAgentLastMessageByVisitorLastMessageTs(roomId: string, visitorLastMessageTs: Date): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	findAllImportedMessagesWithFilesToDownload(): FindCursor<IMessageWithPendingFileImport> {
        /* Implementation Hidden */
    }

	countAllImportedMessagesWithFilesToDownload(): Promise<number> {
        /* Implementation Hidden */
    }

	decreaseReplyCountById(_id: string, inc = -1): Promise<IMessage | null> {
        /* Implementation Hidden */
    }

	removeFileAttachmentsByMessageIds(_ids: string[], replaceWith?: MessageAttachment) {
        /* Implementation Hidden */
    }

	clearFilesByMessageIds(_ids: string[]) {
        /* Implementation Hidden */
    }
}

```