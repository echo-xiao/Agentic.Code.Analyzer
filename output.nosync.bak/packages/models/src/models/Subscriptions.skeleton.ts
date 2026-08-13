## File: packages/models/src/models/Subscriptions.ts

```typescript
import type {
	AtLeast,
	IRole,
	IRoom,
	ISubscription,
	IUser,
	RocketChatRecordDeleted,
	RoomType,
	SpotlightUser,
} from '@rocket.chat/core-typings';
import type { ISubscriptionsModel } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { compact } from 'lodash';
import mem from 'mem';
import type {
	Collection,
	FindCursor,
	Db,
	Filter,
	FindOptions,
	UpdateResult,
	DeleteResult,
	Document,
	AggregateOptions,
	IndexDescription,
	UpdateFilter,
	InsertOneResult,
	InsertManyResult,
	AggregationCursor,
	CountDocumentsOptions,
	DeleteOptions,
	WithId,
	ClientSession,
} from 'mongodb';

import { Rooms, Users } from '../index';
import { BaseRaw } from './BaseRaw';

export class SubscriptionsRaw extends BaseRaw<ISubscription> implements ISubscriptionsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ISubscription>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async getBadgeCount(uid: string): Promise<number> {
        /* Implementation Hidden */
    }

	findOneByRoomIdAndUserId(rid: string, uid: string, options: FindOptions<ISubscription> = {}): Promise<ISubscription | null> {
        /* Implementation Hidden */
    }

	findByUserIdAndRoomIds(userId: string, roomIds: Array<string>, options: FindOptions<ISubscription> = {}): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByRoomId(roomId: string, options: FindOptions<ISubscription> = {}): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findUnarchivedByRoomId(roomId: string, options: FindOptions<ISubscription> = {}): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByRoomIdAndNotUserId(roomId: string, userId: string, options: FindOptions<ISubscription> = {}): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByLivechatRoomIdAndNotUserId(roomId: string, userId: string, options: FindOptions<ISubscription> = {}): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	countByRoomIdAndUserId(rid: string, uid: string | undefined, includeInvitations = false): Promise<number> {
        /* Implementation Hidden */
    }

	countUnarchivedByRoomId(rid: string): Promise<number> {
        /* Implementation Hidden */
    }

	countUnarchivedByRoomIdAndNotUserId(rid: string, uid: string): Promise<number> {
        /* Implementation Hidden */
    }

	async isUserInRole(uid: IUser['_id'], roleId: IRole['_id'], rid?: IRoom['_id']): Promise<boolean> {
        /* Implementation Hidden */
    }

	setAsReadByRoomIdAndUserId(
		rid: string,
		uid: string,
		readThreads = false,
		alert = false,
		options: FindOptions<ISubscription> = {},
	): ReturnType<BaseRaw<ISubscription>['updateOne']> {
        /* Implementation Hidden */
    }

	removeRolesByUserId(uid: IUser['_id'], roles: IRole['_id'][], rid: IRoom['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findUsersInRoles(roles: IRole['_id'][], rid: string | undefined): Promise<FindCursor<IUser>>;

	findUsersInRoles(roles: IRole['_id'][], rid: string | undefined, options: FindOptions<IUser>): Promise<FindCursor<IUser>>;

	findUsersInRoles<P extends Document = IUser>(
		roles: IRole['_id'][],
		rid: string | undefined,
		options: FindOptions<P extends IUser ? IUser : P>,
	): Promise<FindCursor<P>>;

	async findUsersInRoles<P extends Document = IUser>(
		roles: IRole['_id'][],
		rid: IRoom['_id'] | undefined,
		options?: FindOptions<P extends IUser ? IUser : P>,
	): Promise<FindCursor<P>> {
        /* Implementation Hidden */
    }

	async countUsersInRoles(roles: IRole['_id'][], rid: IRoom['_id'] | undefined): Promise<number> {
        /* Implementation Hidden */
    }

	addRolesByUserId(uid: IUser['_id'], roles: IRole['_id'][], rid?: IRoom['_id']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async isUserInRoleScope(uid: IUser['_id'], rid?: IRoom['_id']): Promise<boolean> {
        /* Implementation Hidden */
    }

	async updateAllRoomTypesByRoomId(roomId: IRoom['_id'], roomType: RoomType): Promise<void> {
        /* Implementation Hidden */
    }

	async updateAllRoomNamesByRoomId(roomId: IRoom['_id'], name: string, fname: string): Promise<void> {
        /* Implementation Hidden */
    }

	findByRolesAndRoomId({ roles, rid }: { roles: string; rid?: string }, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByUserIdAndTypes(userId: string, types: ISubscription['t'][], options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findOpenByVisitorIds(visitorIds: string[], options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByRoomIdAndNotAlertOrOpenExcludingUserIds(
		{
			roomId,
			uidsExclude,
			uidsInclude,
			onlyRead,
		}: {
			roomId: ISubscription['rid'];
			uidsExclude?: ISubscription['u']['_id'][];
			uidsInclude?: ISubscription['u']['_id'][];
			onlyRead: boolean;
		},
		options?: FindOptions<ISubscription>,
	) {
        /* Implementation Hidden */
    }

	async removeByRoomId(
		roomId: ISubscription['rid'],
		options?: DeleteOptions & { onTrash: (doc: ISubscription) => void },
	): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	findByRoomIdExcludingUserIds(
		roomId: ISubscription['rid'],
		userIds: ISubscription['u']['_id'][],
		options: FindOptions<ISubscription> = {},
	): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	async findConnectedUsersExcept(
		userId: string,
		searchTerm: string,
		exceptions: string[],
		searchFields: string[],
		extraConditions: Filter<IUser>,
		limit: number,
		roomType?: ISubscription['t'],
		{ startsWith = false, endsWith = false }: { startsWith?: string | false; endsWith?: string | false } = {},
		options: AggregateOptions = {},
	): Promise<SpotlightUser[]> {
        /* Implementation Hidden */
    }

	incUnreadForRoomIdExcludingUserIds(roomId: IRoom['_id'], userIds: IUser['_id'][], inc: number): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setAlertForRoomIdExcludingUserId(roomId: IRoom['_id'], userId: IUser['_id']): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setOpenForRoomIdExcludingUserId(roomId: IRoom['_id'], userId: IUser['_id']): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateNameAndFnameByRoomId(roomId: string, name: string, fname: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateNameAndFnameByVisitorIds(visitorIds: string[], name: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async setGroupE2EKeyAndOldRoomKeys(_id: string, key: string, oldRoomKeys?: ISubscription['oldRoomKeys']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async setGroupE2EKey(_id: string, key: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setGroupE2ESuggestedKey(uid: string, rid: string, key: string): Promise<null | WithId<ISubscription>> {
        /* Implementation Hidden */
    }

	setE2EKeyByUserIdAndRoomId(userId: string, rid: string, key: string): Promise<null | WithId<ISubscription>> {
        /* Implementation Hidden */
    }

	setGroupE2ESuggestedKeyAndOldRoomKeys(
		uid: string,
		rid: string,
		key: string,
		suggestedOldRoomKeys?: ISubscription['suggestedOldRoomKeys'],
	): Promise<null | WithId<ISubscription>> {
        /* Implementation Hidden */
    }

	unsetGroupE2ESuggestedKeyAndOldRoomKeys(_id: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setOnHoldByRoomId(rid: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unsetOnHoldByRoomId(rid: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findByRoomIds(roomIds: ISubscription['u']['_id'][], options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	removeByVisitorToken(token: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	findByToken(token: string, options?: FindOptions): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	updateAutoTranslateById(_id: string, autoTranslate: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateDraftByRoomIdAndUserId(rid: string, uid: string, draft: string | undefined): Promise<null | WithId<ISubscription>> {
        /* Implementation Hidden */
    }

	setAutoTranslateByUserId(userId: IUser['_id'], language: string | null): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findByAutoTranslateAndUserId(
		userId: ISubscription['u']['_id'],
		autoTranslate: ISubscription['autoTranslate'] = true,
		options?: FindOptions<ISubscription>,
	): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	disableAutoTranslateByRoomId(roomId: IRoom['_id']): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateAutoTranslateLanguageById(_id: string, autoTranslateLanguage: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	getAutoTranslateLanguagesByRoomAndNotUser(rid: string, userId: string): Promise<(string | undefined)[]> {
        /* Implementation Hidden */
    }

	/**
	 * @param {string} userId
	 * @param {string} scope the value for the role scope (room id)
	 */
	roleBaseQuery(userId: string, scope?: string): Filter<ISubscription> | void {
        /* Implementation Hidden */
    }

	findByRidWithoutE2EKey(rid: string, options: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findUsersWithPublicE2EKeyByRids(
		rids: IRoom['_id'][],
		excludeUserId: IUser['_id'],
		usersLimit = 50,
	): AggregationCursor<{ rid: IRoom['_id']; users: { _id: IUser['_id']; public_key: string }[] }> {
        /* Implementation Hidden */
    }

	updateAudioNotificationValueById(_id: string, audioNotificationValue: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	clearAudioNotificationValueById(_id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateNotificationsPrefById(
		_id: string,
		notificationPref: { value: number; origin: string } | null,
		notificationField: keyof ISubscription,
		notificationPrefOrigin: keyof ISubscription,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateUnreadAlertById(_id: string, unreadAlert: ISubscription['unreadAlert']): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateDisableNotificationsById(_id: string, disableNotifications: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateHideUnreadStatusById(_id: string, hideUnreadStatus: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateHideMentionStatusById(_id: string, hideMentionStatus: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateMuteGroupMentions(_id: string, muteGroupMentions: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	changeDepartmentByRoomId(rid: string, department: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findAlwaysNotifyDesktopUsersByRoomId(roomId: string): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findDontNotifyDesktopUsersByRoomId(roomId: string): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findAlwaysNotifyMobileUsersByRoomId(roomId: string): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findDontNotifyMobileUsersByRoomId(roomId: string): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findWithSendEmailByRoomId(roomId: string): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	resetUserE2EKey(userId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findByUserIdWithoutE2E(userId: string, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findOneByRoomIdAndUsername(roomId: string, username: string, options: FindOptions<ISubscription>): Promise<ISubscription | null> {
        /* Implementation Hidden */
    }

	findOneByRoomNameAndUserId(roomName: string, userId: string): Promise<ISubscription | null> {
        /* Implementation Hidden */
    }

	// FIND
	findByUserId(userId: string, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	cachedFindByUserId = mem(this.findByUserId.bind(this), { maxAge: 5000 });

	findByUserIdExceptType(
		userId: string,
		typeException: ISubscription['t'],
		options?: FindOptions<ISubscription>,
	): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByUserIdAndType(userId: string, type: ISubscription['t'], options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	/**
	 * @param {IUser['_id']} userId
	 * @param {IRole['_id'][]} roles
	 * @param {any} options
	 */
	findByUserIdAndRoles(userId: string, roles: string[], options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByUserIdUpdatedAfter(userId: string, updatedAt: Date, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	/**
	 * @param {string} roomId
	 * @param {IRole['_id'][]} roles the list of roles
	 * @param {any} options
	 */
	findByRoomIdAndRoles: ISubscriptionsModel['findByRoomIdAndRoles'] = (
		roomId: string,
		roles: string[],
		options?: FindOptions<ISubscription>,
	) => {
		const rolesArray = ([] as string[]).concat(roles);
		const query = {
			rid: roomId,
			roles: { $in: rolesArray },
		};

		return this.find(query, options);
	};

	countByRoomIdAndRoles(roomId: string, roles: string[]): Promise<number> {
        /* Implementation Hidden */
    }

	countByUserIdExceptType(userId: string, typeException: ISubscription['t']): Promise<number> {
        /* Implementation Hidden */
    }

	countByRoomId(roomId: string, options?: CountDocumentsOptions): Promise<number> {
        /* Implementation Hidden */
    }

	findByType(types: ISubscription['t'][], options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByTypeAndUserId(type: ISubscription['t'], userId: string, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByRoomWithUserHighlights(roomId: string, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	async getLastSeen(options: FindOptions<ISubscription> = { projection: { _id: 0, ls: 1 } }): Promise<Date | undefined> {
        /* Implementation Hidden */
    }

	findByRoomIdAndUserIds(
		roomId: ISubscription['rid'],
		userIds: ISubscription['u']['_id'][],
		options?: FindOptions<ISubscription>,
	): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByRoomIdAndUserIdsOrAllMessages(roomId: string, userIds: string[]): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByRoomIdWhenUserIdExists(rid: string, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByRoomIdWhenUsernameExists(rid: string, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	countByRoomIdWhenUsernameExists(rid: string): Promise<number> {
        /* Implementation Hidden */
    }

	findUnreadByUserId(userId: string): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	getMinimumLastSeenByRoomId(rid: string): Promise<ISubscription | null> {
        /* Implementation Hidden */
    }

	// UPDATE
	archiveByRoomId(roomId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findArchivedByRoomId(roomId: string, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findArchivedByUserId(userId: string, options?: FindOptions<ISubscription>): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	unarchiveByIds(ids: string[]): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	hideByRoomIdAndUserId(roomId: string, userId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setAsUnreadByRoomIdAndUserId(roomId: string, userId: string, firstMessageUnreadTimestamp: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setCustomFieldsDirectMessagesByUserId(userId: string, fields: Record<string, any>): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findByUserIdAndRoomType(
		userId: ISubscription['u']['_id'],
		type: ISubscription['t'],
		options?: FindOptions<ISubscription>,
	): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	findByNameAndRoomType(
		filter: Partial<Pick<ISubscription, 'name' | 't'>>,
		options?: FindOptions<ISubscription>,
	): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	setFavoriteByRoomIdAndUserId(roomId: string, userId: string, favorite?: boolean): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateNameAndAlertByRoomId(roomId: string, name: string, fname: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateDisplayNameByRoomId(roomId: string, fname: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateFnameByRoomId(rid: string, fname: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateNameAndFnameById(
		_id: string,
		name: string,
		fname: string,
		options?: { session?: ClientSession },
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setUserUsernameByUserId(userId: string, username: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setNameForDirectRoomsWithOldName(oldName: string, name: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateDirectNameAndFnameByName(name: string, newName?: string, newFname?: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	incGroupMentionsAndUnreadForRoomIdExcludingUserId(
		roomId: IRoom['_id'],
		userId: IUser['_id'],
		incGroup = 1,
		incUnread = 1,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	incUserMentionsAndUnreadForRoomIdAndUserIds(
		roomId: IRoom['_id'],
		userIds: IUser['_id'][],
		incUser = 1,
		incUnread = 1,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	ignoreUser({ _id, ignoredUser: ignored, ignore = true }: { _id: string; ignoredUser: string; ignore?: boolean }): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setAlertForRoomIdAndUserIds(roomId: ISubscription['rid'], uids: ISubscription['u']['_id'][]): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setOpenForRoomIdAndUserIds(roomId: string, uids: string[]): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setLastReplyForRoomIdAndUserIds(roomId: IRoom['_id'], uids: IUser['_id'][], lr: Date): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async setBlockedByRoomId(rid: string, blocked: string, blocker: string): Promise<UpdateResult[]> {
        /* Implementation Hidden */
    }

	async unsetBlockedByRoomId(rid: string, blocked: string, blocker: string): Promise<UpdateResult[]> {
        /* Implementation Hidden */
    }

	updateCustomFieldsByRoomId(rid: string, cfields: Record<string, any>): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateTypeByRoomId(roomId: string, type: ISubscription['t']): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	/**
	 * @param {string} _id the subscription id
	 * @param {IRole['_id']} role the id of the role
	 */
	addRoleById(_id: string, role: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	/**
	 * @param {string} _id the subscription id
	 * @param {IRole['_id']} role the id of the role
	 */
	removeRoleById(_id: string, role: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setArchivedForDMsWithUsername(username: string, archived: boolean): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	setArchivedByUserId(userId: string, archived: boolean): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	clearNotificationUserPreferences(
		userId: string,
		notificationField: string,
		notificationOriginField: string,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateNotificationUserPreferences(
		userId: string,
		userPref: string | number | boolean,
		notificationField: keyof ISubscription,
		notificationOriginField: keyof ISubscription,
	): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findByUserPreferences(
		userId: string,
		notificationOriginField: keyof ISubscription,
		notificationOriginValue: 'user' | 'subscription',
		options?: FindOptions<ISubscription>,
	): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	updateUserHighlights(userId: string, userHighlights: any): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateDirectFNameByName(name: string, fname: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	// INSERT
	async createWithRoomAndUser(room: IRoom, user: IUser, extraData: Partial<ISubscription> = {}): Promise<InsertOneResult<ISubscription>> {
        /* Implementation Hidden */
    }

	async createWithRoomAndManyUsers(
		room: IRoom,
		users: { user: AtLeast<IUser, '_id' | 'username' | 'name' | 'settings'>; extraData: Record<string, any> }[] = [],
	): Promise<InsertManyResult<ISubscription>> {
        /* Implementation Hidden */
    }

	// REMOVE
	async removeByUserId(userId: string): Promise<number> {
        /* Implementation Hidden */
    }

	async removeByRoomIdAndUserId(roomId: string, userId: string): Promise<ISubscription | null> {
        /* Implementation Hidden */
    }

	removeInvitedByRoomIdAndUserId(roomId: string, userId: string): Promise<ISubscription | null> {
        /* Implementation Hidden */
    }

	async removeByRoomIds(rids: string[], options?: { onTrash: (doc: ISubscription) => void }): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async removeByRoomIdsAndUserId(rids: string[], userId: string): Promise<number> {
        /* Implementation Hidden */
    }

	// //////////////////////////////////////////////////////////////////
	// threads

	async addUnreadThreadByRoomIdAndUserIds(
		rid: string,
		users: string[],
		tmid: string,
		{ groupMention = false, userMention = false }: { groupMention?: boolean; userMention?: boolean } = {},
	): Promise<UpdateResult | Document | void> {
        /* Implementation Hidden */
    }

	removeUnreadThreadByRoomIdAndUserId(rid: string, userId: string, tmid: string, clearAlert = false): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	removeUnreadThreadsByRoomId(rid: string, tunread: string[]): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	findUnreadThreadsByRoomId(
		rid: ISubscription['rid'],
		tunread: ISubscription['tunread'],
		options?: FindOptions<ISubscription>,
	): FindCursor<ISubscription> {
        /* Implementation Hidden */
    }

	openByRoomIdAndUserId(roomId: string, userId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findUserFederatedRoomIds(userId: IUser['_id']): AggregationCursor<{ _id: IRoom['_id']; externalRoomId: string }> {
        /* Implementation Hidden */
    }

	async findInvitedSubscription(roomId: ISubscription['rid'], userId: ISubscription['u']['_id']): Promise<ISubscription | null> {
        /* Implementation Hidden */
    }

	async acceptInvitationById(subscriptionId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async findOneBannedSubscription(roomId: ISubscription['rid'], userId: ISubscription['u']['_id']): Promise<ISubscription | null> {
        /* Implementation Hidden */
    }

	findBannedByRoomId(roomId: ISubscription['rid']) {
        /* Implementation Hidden */
    }

	async banByRoomIdAndUserId(roomId: string, userId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async unbanByRoomIdAndUserId(roomId: string, userId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	unbanToInvitedById(subId: string, inviter: Required<Pick<IUser, '_id' | 'username'>> & Pick<IUser, 'name'>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setAbacLastTimeCheckedByUserIdAndRoomId(userId: string, roomId: string, time: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findJoinedByUserId<T extends Document = ISubscription>(userId: ISubscription['u']['_id'], options?: FindOptions<T>): FindCursor<T> {
        /* Implementation Hidden */
    }
}

```