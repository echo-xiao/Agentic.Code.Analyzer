## File: packages/models/src/models/Rooms.ts

```typescript
import type {
	IDirectMessageRoom,
	IMessage,
	IOmnichannelGenericRoom,
	IRoom,
	IRoomFederated,
	IRoomNativeFederated,
	ITeam,
	IUser,
	RocketChatRecordDeleted,
} from '@rocket.chat/core-typings';
import type { FindPaginated, IRoomsModel, IChannelsWithNumberOfMessagesBetweenDate } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type {
	AggregationCursor,
	Collection,
	Db,
	DeleteResult,
	Document,
	Filter,
	FindCursor,
	FindOptions,
	IndexDescription,
	UpdateFilter,
	UpdateOptions,
	UpdateResult,
	WithId,
	CountDocumentsOptions,
} from 'mongodb';

import { Subscriptions } from '../index';
import { BaseRaw } from './BaseRaw';
import { readSecondaryPreferred } from '../readSecondaryPreferred';
import type { Updater } from '../updater';

export class RoomsRaw extends BaseRaw<IRoom> implements IRoomsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IRoom>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async isAbacAttributeInUse(key: string, values: string[]): Promise<boolean> {
        /* Implementation Hidden */
    }

	findOneByRoomIdAndUserId(rid: IRoom['_id'], uid: IUser['_id'], options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findManyByRoomIds(roomIds: Array<IRoom['_id']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findManyArchivedByRoomIds(roomIds: Array<IRoom['_id']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findPaginatedByIds(
		roomIds: Array<IRoom['_id']>,
		options: FindOptions<IRoom> = {},
	): FindPaginated<FindCursor<IRoom & { isLastOwner?: boolean }>> {
        /* Implementation Hidden */
    }

	async getMostRecentAverageChatDurationTime(
		numberMostRecentChats: number,
		department?: string,
	): Promise<{ props: { _id: IRoom['_id']; avgChatDuration: number } }> {
        /* Implementation Hidden */
    }

	findByNameOrFnameContainingAndTypes(
		name: NonNullable<IRoom['name']>,
		types: Array<IRoom['t']>,
		discussion = false,
		teams = false,
		options: FindOptions<IRoom> = {},
	): FindPaginated<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	findPrivateRoomsAndTeamsPaginated(name: NonNullable<IRoom['name']>, options: FindOptions<IRoom> = {}): FindPaginated<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	findByTeamId(teamId: ITeam['_id'], options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	countByTeamId(teamId: ITeam['_id']): Promise<number> {
        /* Implementation Hidden */
    }

	findPaginatedByTeamIdContainingNameAndDefault(
		teamId: ITeam['_id'],
		name: IRoom['name'],
		teamDefault: boolean,
		ids: Array<IRoom['_id']> | undefined,
		options: FindOptions<IRoom> = {},
	): FindPaginated<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	findByTeamIdAndRoomsId(teamId: ITeam['_id'], rids: Array<IRoom['_id']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findRoomsByNameOrFnameStarting(name: NonNullable<IRoom['name']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findRoomsWithoutDiscussionsByRoomIds(
		name: NonNullable<IRoom['name']>,
		roomIds: Array<IRoom['_id']>,
		options: FindOptions<IRoom> = {},
	): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findPaginatedRoomsWithoutDiscussionsByRoomIds(
		name: NonNullable<IRoom['name']>,
		roomIds: Array<IRoom['_id']>,
		options: FindOptions<IRoom> = {},
	): FindPaginated<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	findChannelAndGroupListWithoutTeamsByNameStartingByOwner(
		name: IRoom['name'],
		groupsToAccept: Array<IRoom['_id']>,
		options: FindOptions<IRoom> = {},
	): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	unsetTeamId(teamId: ITeam['_id'], options: UpdateOptions = {}): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	unsetTeamById(rid: IRoom['_id'], options: UpdateOptions = {}): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setTeamById(
		rid: IRoom['_id'],
		teamId: ITeam['_id'],
		teamDefault: IRoom['teamDefault'],
		options: UpdateOptions = {},
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setTeamMainById(rid: IRoom['_id'], teamId: ITeam['_id'], options: UpdateOptions = {}): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setTeamByIds(rids: Array<IRoom['_id']>, teamId: ITeam['_id'], options: UpdateOptions = {}): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	setTeamDefaultById(
		rid: IRoom['_id'],
		teamDefault: NonNullable<IRoom['teamDefault']>,
		options: UpdateOptions = {},
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	getChannelsWithNumberOfMessagesBetweenDateQuery({
		types,
		start,
		end,
		startOfLastWeek,
		endOfLastWeek,
		options,
	}: {
		types: Array<IRoom['t']>;
		start: number;
		end: number;
		startOfLastWeek: number;
		endOfLastWeek: number;
		options?: any;
	}) {
        /* Implementation Hidden */
    }

	findChannelsByTypesWithNumberOfMessagesBetweenDate(params: {
		types: Array<IRoom['t']>;
		start: number;
		end: number;
		startOfLastWeek: number;
		endOfLastWeek: number;
		options?: any;
	}): AggregationCursor<IChannelsWithNumberOfMessagesBetweenDate> {
        /* Implementation Hidden */
    }

	findOneByNameOrFname(name: NonNullable<IRoom['name']>, options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findOneByJoinCodeAndId(joinCode: string, rid: IRoom['_id'], options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	async findOneByNonValidatedName(name: NonNullable<IRoom['name']>, options: FindOptions<IRoom> = {}) {
        /* Implementation Hidden */
    }

	findOneByName(name: NonNullable<IRoom['name']>, options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findDefaultRoomsForTeam(teamId: ITeam['_id']): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	incUsersCountByIds(ids: Array<IRoom['_id']>, inc = 1, options?: UpdateOptions): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	allRoomSourcesCount(): AggregationCursor<{ _id: Required<IOmnichannelGenericRoom['source']>; count: number }> {
        /* Implementation Hidden */
    }

	findByBroadcast(options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	countByBroadcast(options?: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	setAsFederated(roomId: IRoom['_id'], { mrid, origin }: { mrid: string; origin: string }): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setRoomTypeById(roomId: IRoom['_id'], roomType: IRoom['t']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setRoomNameById(roomId: IRoom['_id'], name: IRoom['name']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setFnameById(_id: IRoom['_id'], fname: IRoom['fname']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setRoomTopicById(roomId: IRoom['_id'], topic: IRoom['description']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findByE2E(options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	countByE2E(options?: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	findE2ERoomById(roomId: IRoom['_id'], options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findRoomsInsideTeams(autoJoin = false): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	countRoomsInsideTeams(autoJoin = false): Promise<number> {
        /* Implementation Hidden */
    }

	countByType(t: IRoom['t']): Promise<number> {
        /* Implementation Hidden */
    }

	findPaginatedByNameOrFNameAndRoomIdsIncludingTeamRooms(
		searchTerm: RegExp | null,
		teamIds: Array<ITeam['_id']>,
		roomIds: Array<IRoom['_id']>,
		options: FindOptions<IRoom> = {},
	): FindPaginated<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	findPaginatedContainingNameOrFNameInIdsAsTeamMain(
		searchTerm: RegExp | null,
		rids: Array<IRoom['_id']>,
		options: FindOptions<IRoom> = {},
	): FindPaginated<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	findPaginatedByTypeAndIds(
		type: IRoom['t'],
		ids: Array<IRoom['_id']>,
		options: FindOptions<IRoom> = {},
	): FindPaginated<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	findOneDirectRoomContainingAllUserIDs(uid: IDirectMessageRoom['uids'], options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findFederatedRooms(options: FindOptions<IRoom> = {}): FindCursor<IRoomFederated> {
        /* Implementation Hidden */
    }

	findFederatedByIds<T extends Document = IRoomNativeFederated>(ids: Array<IRoom['_id']>, options: FindOptions<T> = {}): FindCursor<T> {
        /* Implementation Hidden */
    }

	findOneFederatedByMrid(mrid: string, options: FindOptions<IRoomFederated> = {}): Promise<IRoomFederated | null> {
        /* Implementation Hidden */
    }

	findCountOfRoomsWithActiveCalls(): Promise<number> {
        /* Implementation Hidden */
    }

	async findBiggestFederatedRoomInNumberOfUsers(options?: FindOptions<IRoom>): Promise<IRoom | undefined> {
        /* Implementation Hidden */
    }

	async findFederatedRoomByAmountOfUsers(options?: FindOptions<IRoom>, asc = true): Promise<IRoom | undefined> {
        /* Implementation Hidden */
    }

	async findSmallestFederatedRoomInNumberOfUsers(options?: FindOptions<IRoom>): Promise<IRoom | undefined> {
        /* Implementation Hidden */
    }

	async countFederatedRooms(): Promise<number> {
        /* Implementation Hidden */
    }

	incMsgCountById(_id: IRoom['_id'], inc = 1): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	getIncMsgCountUpdateQuery(inc: number, roomUpdater: Updater<IRoom>): Updater<IRoom> {
        /* Implementation Hidden */
    }

	decreaseMessageCountById(_id: IRoom['_id'], count = 1) {
        /* Implementation Hidden */
    }

	findOneByIdOrName(_idOrName: IRoom['_id'] | IRoom['name'], options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findOneByIdAndType<T extends Document = IRoom>(
		roomId: IRoom['_id'],
		type: IRoom['t'],
		options: FindOptions<T> = {} as FindOptions<T>,
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	setReactionsInLastMessage(roomId: IRoom['_id'], reactions: IMessage['reactions']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unsetReactionsInLastMessage(roomId: IRoom['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unsetAllImportIds(): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	updateLastMessageStar(roomId: IRoom['_id'], userId: IUser['_id'], starred: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setLastMessagePinned(
		roomId: IRoom['_id'],
		pinnedBy: IMessage['pinnedBy'],
		pinned: IMessage['pinned'],
		pinnedAt: IMessage['pinnedAt'],
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setLastMessageAsRead(roomId: IRoom['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setDescriptionById(_id: IRoom['_id'], description: IRoom['description']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setReadOnlyById(_id: IRoom['_id'], readOnly: NonNullable<IRoom['ro']>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setDmReadOnlyByUserId(
		_id: IRoom['_id'],
		ids: Array<IRoom['_id']>,
		readOnly: NonNullable<IRoom['ro']>,
		reactWhenReadOnly: NonNullable<IRoom['reactWhenReadOnly']>,
	): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	getDirectConversationsByUserId(_id: IRoom['_id'], options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	// 2
	setAllowReactingWhenReadOnlyById(_id: IRoom['_id'], allowReacting: NonNullable<IRoom['reactWhenReadOnly']>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setAvatarData(_id: IRoom['_id'], origin: string, etag: IRoom['avatarETag']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unsetAvatarData(_id: IRoom['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setSystemMessagesById(_id: IRoom['_id'], systemMessages: IRoom['sysMes']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setE2eKeyId(_id: IRoom['_id'], e2eKeyId: IRoom['e2eKeyId'], options: UpdateOptions = {}): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findOneByImportId(_id: IRoom['_id'], options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findOneByNameAndNotId(name: NonNullable<IRoom['name']>, rid: IRoom['_id']): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findOneByDisplayName(fname: IRoom['fname'], options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findOneByNameAndType(
		name: NonNullable<IRoom['name']>,
		type: IRoom['t'],
		options: FindOptions<IRoom> = {},
		includeFederatedRooms = false,
	): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	// FIND
	findById(roomId: IRoom['_id'], options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findByIds(roomIds: Array<IRoom['_id']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findByType(type: IRoom['t'], options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findByTypeInIds(type: IRoom['t'], ids: Array<IRoom['_id']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findPrivateRoomsByIdsWithAbacAttributes(ids: Array<IRoom['_id']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findAllPrivateRoomsWithAbacAttributes(options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	async findBySubscriptionUserId(userId: IUser['_id'], options: FindOptions<IRoom> = {}): Promise<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	async findBySubscriptionUserIdUpdatedAfter(
		userId: IUser['_id'],
		_updatedAt: IRoom['_updatedAt'],
		options: FindOptions<IRoom> = {},
	): Promise<FindCursor<IRoom>> {
        /* Implementation Hidden */
    }

	findByNameAndTypeNotDefault(
		name: IRoom['name'] | RegExp,
		type: IRoom['t'],
		options: FindOptions<IRoom> = {},
		includeFederatedRooms = false,
	): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	// 3
	findByNameOrFNameAndTypesNotInIds(
		name: IRoom['name'] | RegExp,
		types: Array<IRoom['t']>,
		ids: Array<IRoom['_id']>,
		options: FindOptions<IRoom> = {},
		includeFederatedRooms = false,
	): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findByDefaultAndTypes(defaultValue: boolean, types: Array<IRoom['t']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findDirectRoomContainingAllUsernames(
		usernames: NonNullable<IRoom['usernames']>,
		options: FindOptions<IRoom> = {},
	): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findByTypeAndName(type: IRoom['t'], name: NonNullable<IRoom['name']>, options: FindOptions<IRoom> = {}): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findByTypeAndNameOrId(
		type: IRoom['t'],
		identifier: NonNullable<IRoom['name'] | IRoom['_id']>,
		options: FindOptions<IRoom> = {},
	): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	findByTypeAndNameContaining(type: IRoom['t'], name: NonNullable<IRoom['name']>, options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findByTypeInIdsAndNameContaining(
		type: IRoom['t'],
		ids: Array<IRoom['_id']>,
		name: NonNullable<IRoom['name']>,
		options: FindOptions<IRoom> = {},
	): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findGroupDMsByUids(uids: NonNullable<IRoom['uids']>, options: FindOptions<IDirectMessageRoom> = {}): FindCursor<IDirectMessageRoom> {
        /* Implementation Hidden */
    }

	countGroupDMsByUids(uids: NonNullable<IRoom['uids']>): Promise<number> {
        /* Implementation Hidden */
    }

	find1On1ByUserId(userId: IRoom['_id'], options: FindOptions<IRoom> = {}): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findByUsernamesOrUids(uids: IRoom['u']['_id'][], usernames: IRoom['u']['username'][]): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	findDMsByUids(uids: IRoom['u']['_id'][]): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	// UPDATE
	addImportIds(_id: IRoom['_id'], importIds: string[]): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	archiveById(_id: IRoom['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unarchiveById(_id: IRoom['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setNameById(_id: IRoom['_id'], name: IRoom['name'], fname: IRoom['fname']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setIncMsgCountAndSetLastMessageUpdateQuery(
		inc: number,
		lastMessage: IMessage,
		shouldStoreLastMessage: boolean,
		roomUpdater: Updater<IRoom>,
	): Updater<IRoom> {
        /* Implementation Hidden */
    }

	incUsersCountById(_id: IRoom['_id'], inc = 1): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	// 4
	incUsersCountNotDMsByIds(ids: Array<IRoom['_id']>, inc = 1): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	getLastMessageUpdateQuery(lastMessage: IRoom['lastMessage'], roomUpdater: Updater<IRoom>): Updater<IRoom> {
        /* Implementation Hidden */
    }

	async resetLastMessageById(_id: IRoom['_id'], lastMessage: IRoom['lastMessage'] | null, msgCountDelta?: number): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	replaceUsername(previousUsername: IUser['username'], username: IUser['username']): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	replaceMutedUsername(previousUsername: IUser['username'], username: IUser['username']): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	replaceUsernameOfUserByUserId(userId: IUser['_id'], username: IUser['username']): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	setJoinCodeById(_id: IRoom['_id'], joinCode: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setTypeById(_id: IRoom['_id'], type: IRoom['t']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setTopicById(_id: IRoom['_id'], topic: IRoom['topic']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setAnnouncementById(
		_id: IRoom['_id'],
		announcement: IRoom['announcement'],
		announcementDetails: IRoom['announcementDetails'],
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setCustomFieldsById(_id: IRoom['_id'], customFields: IRoom['customFields']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	muteUsernameByRoomId(_id: IRoom['_id'], username: IUser['username']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	muteReadOnlyUsernameByRoomId(_id: IRoom['_id'], username: IUser['username']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unmuteMutedUsernameByRoomId(_id: IRoom['_id'], username: IUser['username']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unmuteReadOnlyUsernameByRoomId(_id: string, username: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveFeaturedById(_id: IRoom['_id'], featured: string | boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveDefaultById(_id: IRoom['_id'], defaultValue: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveFavoriteById(_id: IRoom['_id'], favorite: IRoom['favorite'], defaultValue: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveRetentionEnabledById(_id: IRoom['_id'], value: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveRetentionMaxAgeById(_id: IRoom['_id'], value = 30): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveRetentionExcludePinnedById(_id: IRoom['_id'], value: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveRetentionIgnoreThreadsById(_id: IRoom['_id'], value: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveRetentionFilesOnlyById(_id: IRoom['_id'], value: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveRetentionOverrideGlobalById(_id: IRoom['_id'], value: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	saveEncryptedById(_id: IRoom['_id'], value: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateAbacConfigurationById(_id: IRoom['_id'], value: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setAbacAttributesById(_id: IRoom['_id'], attributes: NonNullable<IRoom['abacAttributes']>): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	unsetAbacAttributesById(_id: IRoom['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateSingleAbacAttributeValuesById(_id: IRoom['_id'], key: string, values: string[]): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	insertAbacAttributeIfNotExistsById(_id: IRoom['_id'], key: string, values: string[]): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	updateAbacAttributeValuesArrayFilteredById(_id: IRoom['_id'], key: string, values: string[]): Promise<IRoom | null> {
        /* Implementation Hidden */
    }

	removeAbacAttributeByRoomIdAndKey(_id: IRoom['_id'], key: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateGroupDMsRemovingUsernamesByUsername(username: string, userId: string): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	async createWithIdTypeAndName(
		_id: IRoom['_id'],
		type: IRoom['t'],
		name: IRoom['name'],
		extraData?: Record<string, unknown>,
	): Promise<IRoom> {
        /* Implementation Hidden */
    }

	async createWithFullRoomData(room: Omit<IRoom, '_id' | '_updatedAt'>): Promise<IRoom> {
        /* Implementation Hidden */
    }

	// REMOVE
	override removeById(_id: IRoom['_id']): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	override removeByIds(ids: Array<IRoom['_id']>): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeDirectRoomContainingUsername(username: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	countDiscussions(): Promise<number> {
        /* Implementation Hidden */
    }

	async getSubscribedRoomIdsWithoutE2EKeys(uid: IUser['_id']): Promise<IRoom['_id'][]> {
        /* Implementation Hidden */
    }

	addUserIdToE2EEQueueByRoomIds(roomIds: IRoom['_id'][], uid: IUser['_id']): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	async removeUsersFromE2EEQueueByRoomId(roomId: IRoom['_id'], uids: IUser['_id'][]): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	async removeUserFromE2EEQueue(uid: IUser['_id']): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	findChildrenOfTeam(
		teamId: string,
		teamRoomId: string,
		userId: string,
		filter?: string,
		type?: 'channels' | 'discussions',
		options?: FindOptions<IRoom>,
	): AggregationCursor<{ totalCount: { count: number }[]; paginatedResults: IRoom[] }> {
        /* Implementation Hidden */
    }

	findAllByTypesAndDiscussionAndTeam(
		filters: {
			types?: Array<IRoom['t']>;
			discussions?: boolean;
			teams?: boolean;
		} = {},
		options: FindOptions<IRoom> = {},
	): FindCursor<IRoom> {
        /* Implementation Hidden */
    }

	resetRoomKeyAndSetE2EEQueueByRoomId(
		roomId: string,
		e2eKeyId: string,
		e2eQueue?: IRoom['usersWaitingForE2EKeys'],
	): Promise<null | WithId<IRoom>> {
        /* Implementation Hidden */
    }

	markRolePrioritesCreatedForRoom(rid: IRoom['_id'], version: number): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async hasCreatedRolePrioritiesForRoom(rid: IRoom['_id'], syncVersion: number) {
        /* Implementation Hidden */
    }

	async countDistinctFederationRoomsExcluding(_serverNames: string[] = []): Promise<string[]> {
        /* Implementation Hidden */
    }

	countAbacEnabled(): Promise<number> {
        /* Implementation Hidden */
    }

	removeUserReferenceFromDMsById(roomId: string, username: string, userId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```