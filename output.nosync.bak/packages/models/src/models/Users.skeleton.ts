## File: packages/models/src/models/Users.ts

```typescript
import type {
	AvailableAgentsAggregation,
	AtLeast,
	DeepWritable,
	ILivechatAgent,
	ILoginToken,
	IMeteorLoginToken,
	IPersonalAccessToken,
	IRole,
	IRoom,
	IUser,
	RocketChatRecordDeleted,
} from '@rocket.chat/core-typings';
import { ILivechatAgentStatus, UserStatus } from '@rocket.chat/core-typings';
import type { DefaultFields, InsertionModel, IUsersModel } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type {
	Collection,
	Db,
	Filter,
	FindOptions,
	IndexDescription,
	Document,
	UpdateFilter,
	UpdateOptions,
	FindCursor,
	SortDirection,
	FindOneAndUpdateOptions,
	AnyBulkWriteOperation,
} from 'mongodb';

import { Rooms, Subscriptions } from '../index';
import { BaseRaw } from './BaseRaw';
import { queryAvailableAgentsForSelection, queryStatusAgentOnline } from '../helpers';

const usersDefaultFields = { __rooms: 0 } as const;

export class UsersRaw extends BaseRaw<IUser, DefaultFields<IUser>> implements IUsersModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IUser>>) {
        /* Implementation Hidden */
    }

	// Move index from constructor to here
	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findUsersByIdentifiers(
		{ usernames, ids, emails, ldapIds }: { usernames?: string[]; ids?: string[]; emails?: string[]; ldapIds?: string[] },
		options: FindOptions<IUser> = {},
	): FindCursor<IUser> {
        /* Implementation Hidden */
    }

	setAbacAttributesById(_id: IUser['_id'], attributes: NonNullable<IUser['abacAttributes']>) {
        /* Implementation Hidden */
    }

	unsetAbacAttributesById(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	findActiveByRoomIds(roomIds: IRoom['_id'][], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	setCasExternalIdByUsername(username: string): Promise<IUser | null> {
        /* Implementation Hidden */
    }

	/**
	 * @param {string} uid
	 * @param {IRole['_id'][]} roles list of role ids
	 */
	addRolesByUserId(uid: string, roles: string | string[]) {
        /* Implementation Hidden */
    }

	/**
	 * @param {IRole['_id'][]} roles list of role ids
	 * @param {null} scope the value for the role scope (room id) - not used in the users collection
	 * @param {any} options
	 */
	findUsersInRoles: IUsersModel['findUsersInRoles'] = (roles: IRole['_id'][] | IRole['_id'], _scope?: null, options?: any) => {
		roles = ([] as string[]).concat(roles);

		const query = {
			roles: { $in: roles },
		};

		return this.find(query, options);
	};

	countUsersInRoles(roles: IRole['_id'][] | IRole['_id']) {
        /* Implementation Hidden */
    }

	findPaginatedUsersInRoles(roles: IRole['_id'][] | IRole['_id'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByUsername<T extends Document = IUser>(username: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneAgentById<T extends Document = ILivechatAgent>(_id: IUser['_id'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	/**
	 * @param {IRole['_id'][] | IRole['_id']} roles the list of role ids
	 * @param {any} query
	 * @param {any} options
	 */
	findUsersInRolesWithQuery(roles: IRole['_id'][] | IRole['_id'], query: Filter<IUser>, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	/**
	 * @param {IRole['_id'][] | IRole['_id']} roles the list of role ids
	 * @param {any} query
	 * @param {any} options
	 */
	findPaginatedUsersInRolesWithQuery<T extends Document = IUser>(
		roles: IRole['_id'][] | IRole['_id'],
		query: Filter<IUser>,
		options?: FindOptions<IUser>,
	) {
        /* Implementation Hidden */
    }

	findAgentsWithDepartments<T extends Document = ILivechatAgent>(
		role: IRole['_id'][] | IRole['_id'],
		query: Filter<IUser>,
		options?: FindOptions<IUser>,
	): Promise<{ sortedResults: (T & { departments: string[] })[]; totalCount: { total: number }[] }[]> {
        /* Implementation Hidden */
    }

	findOneByUsernameAndRoomIgnoringCase(username: string | RegExp, rid: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByIdAndLoginHashedToken(_id: IUser['_id'], token: string, options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findByActiveUsersExcept(
		searchTerm: string,
		exceptions: string[],
		options?: FindOptions<IUser>,
		searchFields?: string[],
		extraQuery: Filter<IUser>[] = [],
		{ startsWith = false, endsWith = false } = {},
	) {
        /* Implementation Hidden */
    }

	findPaginatedByActiveUsersExcept<T extends Document = IUser>(
		searchTerm: string,
		exceptions?: string[],
		options?: FindOptions<IUser>,
		searchFields: string[] = [],
		extraQuery: Filter<IUser>[] = [],
		{ startsWith = false, endsWith = false } = {},
	) {
        /* Implementation Hidden */
    }

	findPaginatedByActiveLocalUsersExcept<T extends Document = IUser>(
		searchTerm: string,
		exceptions?: string[],
		options?: FindOptions<IUser>,
		forcedSearchFields?: string[],
		localDomain?: string,
	) {
        /* Implementation Hidden */
    }

	findPaginatedByActiveExternalUsersExcept<T extends Document = IUser>(
		searchTerm: string,
		exceptions?: string[],
		options?: FindOptions<IUser>,
		forcedSearchFields?: string[],
		localDomain?: string,
	) {
        /* Implementation Hidden */
    }

	findActive(query: Filter<IUser>, options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findActiveByIds(userIds: IUser['_id'][], options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findActiveByIdsOrUsernames(userIds: IUser['_id'][], options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findByIds<T extends Document = IUser>(userIds: IUser['_id'][], options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findOneByImportId<T extends Document = IUser>(_id: IUser['_id'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByUsernameIgnoringCase<T extends Document = IUser>(username: IUser['username'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneWithoutLDAPByUsernameIgnoringCase<T extends Document = IUser>(username: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	async findOneByLDAPId<T extends Document = IUser>(id: string, attribute?: string) {
        /* Implementation Hidden */
    }

	async findOneByAppId<T extends Document = IUser>(appId: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findLDAPUsers<T extends Document = IUser>(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findActiveLDAPUsersExceptIds<T extends Document = IUser>(userIds: IUser['_id'][], options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findConnectedLDAPUsers<T extends Document = IUser>(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	isUserInRole(userId: IUser['_id'], roleId: IRole['_id']) {
        /* Implementation Hidden */
    }

	async getNextLeastBusyAgent(
		department?: string,
		ignoreAgentId?: string,
		isEnabledWhenAgentIdle?: boolean,
		ignoreUsernames?: string[],
		acceptChatsWithNoAgents?: boolean,
	): Promise<{ agentId: string; username?: string; lastRoutingTime?: Date; count: number; departments?: any[] }> {
        /* Implementation Hidden */
    }

	async getLastAvailableAgentRouted(
		department?: string,
		ignoreAgentId?: string,
		isEnabledWhenAgentIdle?: boolean,
		ignoreUsernames?: string[],
		acceptChatsWithNoAgents?: boolean,
	): Promise<{ agentId: string; username?: string; lastRoutingTime?: Date; departments?: any[] }> {
        /* Implementation Hidden */
    }

	async setLastRoutingTime(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	setLivechatStatusIf(
		userId: IUser['_id'],
		status: ILivechatAgentStatus,
		conditions: Filter<IUser> = {},
		extraFields: UpdateFilter<IUser>['$set'] = {},
	) {
        /* Implementation Hidden */
    }

	async getAgentAndAmountOngoingChats(
		userId: IUser['_id'],
		departmentId?: string,
	): Promise<{
		agentId: string;
		username?: string;
		lastAssignTime?: Date;
		lastRoutingTime?: Date;
		queueInfo: { chats: number; chatsForDepartment?: number };
	}> {
        /* Implementation Hidden */
    }

	async acquireAgentLock(agentId: IUser['_id'], lockTime: Date, lockTimeoutMs = 5000): Promise<boolean> {
        /* Implementation Hidden */
    }

	async releaseAgentLock(agentId: IUser['_id'], lockTime: Date): Promise<boolean> {
        /* Implementation Hidden */
    }

	findAllResumeTokensByUserId(userId: IUser['_id']): Promise<{ tokens: IMeteorLoginToken[] }[]> {
        /* Implementation Hidden */
    }

	findActiveByUsernameOrNameRegexWithExceptionsAndConditions<T extends Document = IUser>(
		termRegex: { $regex: string; $options: string } | RegExp,
		exceptions?: string[],
		conditions?: Filter<IUser>,
		options?: FindOptions<IUser>,
	) {
        /* Implementation Hidden */
    }

	countAllAgentsStatus({
		departmentId,
	}: {
		departmentId?: string;
	}): Promise<{ offline: number; away: number; busy: number; available: number }[]> {
        /* Implementation Hidden */
    }

	getTotalOfRegisteredUsersByDate({
		start,
		end,
		options = {},
	}: {
		start: Date;
		end: Date;
		options?: { count?: number; sort?: Record<string, 1 | -1> };
	}): Promise<{ date: string; users: number; type: 'users' }[]> {
        /* Implementation Hidden */
    }

	getUserLanguages(): Promise<{ _id: string; total: number }[]> {
        /* Implementation Hidden */
    }

	updateStatusText(_id: IUser['_id'], statusText: string, options?: UpdateOptions) {
        /* Implementation Hidden */
    }

	findExpiredStatuses() {
        /* Implementation Hidden */
    }

	findNextStatusExpiration() {
        /* Implementation Hidden */
    }

	updatePresenceAndStatus(userId: IUser['_id'], values: Record<string, unknown>, clear?: string[], extraFilter?: Filter<IUser>) {
        /* Implementation Hidden */
    }

	updateStatusAndStatusDefault(_id: IUser['_id'], status: UserStatus, statusDefault: UserStatus) {
        /* Implementation Hidden */
    }

	updateStatusByAppId(appId: string, status: UserStatus) {
        /* Implementation Hidden */
    }

	/**
	 * @param {string} userId
	 * @param {object} status
	 * @param {string} status.status
	 * @param {string} status.statusConnection
	 * @param {string} [status.statusDefault]
	 * @param {string} [status.statusText]
	 */
	updateStatusById(
		userId: IUser['_id'],
		{
			statusDefault,
			status,
			statusConnection,
			statusText,
		}: { statusDefault?: UserStatus; status: UserStatus; statusConnection: UserStatus; statusText?: string },
	) {
        /* Implementation Hidden */
    }

	openAgentsBusinessHoursByBusinessHourId(businessHourIds: string[]) {
        /* Implementation Hidden */
    }

	openAgentBusinessHoursByBusinessHourIdsAndAgentId(businessHourIds: string[], agentId: IUser['_id']) {
        /* Implementation Hidden */
    }

	addBusinessHourByAgentIds(agentIds: IUser['_id'][] = [], businessHourId: string) {
        /* Implementation Hidden */
    }

	findOnlineButNotAvailableAgents<T extends Document = ILivechatAgent>(userIds?: IUser['_id'][]) {
        /* Implementation Hidden */
    }

	removeBusinessHourByAgentIds(agentIds: IUser['_id'][] = [], businessHourId: string) {
        /* Implementation Hidden */
    }

	openBusinessHourToAgentsWithoutDepartment(agentIdsWithDepartment: IUser['_id'][] = [], businessHourId: string) {
        /* Implementation Hidden */
    }

	closeBusinessHourToAgentsWithoutDepartment(agentIdsWithDepartment: IUser['_id'][] = [], businessHourId: string) {
        /* Implementation Hidden */
    }

	closeAgentsBusinessHoursByBusinessHourIds(businessHourIds: string[]) {
        /* Implementation Hidden */
    }

	findAgentsAvailableWithoutBusinessHours(userIds: IUser['_id'][] = []) {
        /* Implementation Hidden */
    }

	setLivechatStatusActiveBasedOnBusinessHours(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	async isAgentWithinBusinessHours(agentId: IUser['_id']) {
        /* Implementation Hidden */
    }

	removeBusinessHoursFromAllUsers() {
        /* Implementation Hidden */
    }

	resetTOTPById(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	unsetOneLoginToken(_id: IUser['_id'], token: string) {
        /* Implementation Hidden */
    }

	unsetLoginTokens(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	removeNonPATLoginTokensExcept(userId: IUser['_id'], authToken: string) {
        /* Implementation Hidden */
    }

	removeNonLoginTokensExcept(userId: IUser['_id'], authToken: string) {
        /* Implementation Hidden */
    }

	removeRoomsByRoomIdsAndUserId(rids: IRoom['_id'][], userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	/**
	 * @param {string} uid
	 * @param {IRole['_id']} roles the list of role ids to remove
	 */
	removeRolesByUserId(uid: IUser['_id'], roles: IRole['_id'][]) {
        /* Implementation Hidden */
    }

	async isUserInRoleScope(uid: IUser['_id']) {
        /* Implementation Hidden */
    }

	addBannerById(_id: IUser['_id'], banner: { id: string }) {
        /* Implementation Hidden */
    }

	findActiveUsersTOTPEnable(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	countActiveUsersTOTPEnable(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findActiveUsersEmail2faEnable(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	countActiveUsersEmail2faEnable(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	setAsFederated(uid: IUser['_id']) {
        /* Implementation Hidden */
    }

	removeRoomByRoomId(rid: IRoom['_id'], options?: UpdateOptions) {
        /* Implementation Hidden */
    }

	findOneByResetToken(token: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByIdWithEmailAddress(userId: IUser['_id'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	setFederationAvatarUrlById(userId: IUser['_id'], federationAvatarUrl: string) {
        /* Implementation Hidden */
    }

	async findSearchedServerNamesByUserId(userId: IUser['_id']): Promise<string[]> {
        /* Implementation Hidden */
    }

	addServerNameToSearchedServerNamesList(userId: IUser['_id'], serverName: string) {
        /* Implementation Hidden */
    }

	removeServerNameFromSearchedServerNamesList(userId: IUser['_id'], serverName: string) {
        /* Implementation Hidden */
    }

	countFederatedExternalUsers() {
        /* Implementation Hidden */
    }

	findOnlineUserFromList<T extends Document = ILivechatAgent>(
		userList: string | string[],
		isLivechatEnabledWhenAgentIdle?: boolean,
		acceptChatsWithNoAgents?: boolean,
	) {
        /* Implementation Hidden */
    }

	countOnlineUserFromList(userList: string | string[], isLivechatEnabledWhenAgentIdle?: boolean) {
        /* Implementation Hidden */
    }

	findOneOnlineAgentByUserList(
		userList: string | string[],
		options?: FindOptions<IUser>,
		isLivechatEnabledWhenAgentIdle?: boolean,
		acceptChatsWithNoAgents?: boolean,
	) {
        /* Implementation Hidden */
    }

	async getUnavailableAgents(
		_departmentId?: string,
		_extraQuery?: Filter<AvailableAgentsAggregation>,
		_isLivechatEnabledWhenAgentIdle?: boolean,
		_acceptChatsWithNoAgent?: boolean,
	): Promise<Pick<AvailableAgentsAggregation, 'username'>[]> {
        /* Implementation Hidden */
    }

	findBotAgents<T extends Document = ILivechatAgent>(usernameList?: string | string[]): FindCursor<T> {
        /* Implementation Hidden */
    }

	countBotAgents(usernameList?: string | string[]) {
        /* Implementation Hidden */
    }

	removeAllRoomsByUserId(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	removeRoomByUserId(_id: IUser['_id'], rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	addRoomByUserId(_id: IUser['_id'], rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	addRoomByUserIds(uids: IUser['_id'][], rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	removeRoomByRoomIds(rids: IRoom['_id'][]) {
        /* Implementation Hidden */
    }

	addRoomRolePriorityByUserId(userId: IUser['_id'], rid: IRoom['_id'], priority: number) {
        /* Implementation Hidden */
    }

	removeRoomRolePriorityByUserId(userId: IUser['_id'], rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	async assignRoomRolePrioritiesByUserIdPriorityMap(userIdAndrolePriorityMap: Record<string, number>, rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	unassignRoomRolePrioritiesByRoomId(rid: IRoom['_id']) {
        /* Implementation Hidden */
    }

	getLoginTokensByUserId(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	addPersonalAccessTokenToUser({ userId, loginTokenObject }: { userId: IUser['_id']; loginTokenObject: ILoginToken }) {
        /* Implementation Hidden */
    }

	removePersonalAccessTokenOfUser({
		userId,
		loginTokenObject,
	}: {
		userId: IUser['_id'];
		loginTokenObject: AtLeast<IPersonalAccessToken, 'type' | 'name'>;
	}) {
        /* Implementation Hidden */
    }

	findPersonalAccessTokenByTokenNameAndUserId({ userId, tokenName }: { userId: IUser['_id']; tokenName: string }) {
        /* Implementation Hidden */
    }

	async checkOnlineAgents(agentId: IUser['_id'], isLivechatEnabledWhenAgentIdle?: boolean, acceptChatsWithNoAgents?: boolean) {
        /* Implementation Hidden */
    }

	findOnlineAgents<T extends Document = ILivechatAgent>(
		agentId?: IUser['_id'],
		isLivechatEnabledWhenAgentIdle?: boolean,
		acceptChatsWithNoAgents?: boolean,
	) {
        /* Implementation Hidden */
    }

	countOnlineAgents(agentId: IUser['_id']) {
        /* Implementation Hidden */
    }

	findOneBotAgent<T extends Document = ILivechatAgent>() {
        /* Implementation Hidden */
    }

	findOneOnlineAgentById<T extends Document = ILivechatAgent>(
		_id: IUser['_id'],
		isLivechatEnabledWhenAgentIdle?: boolean,
		acceptChatsWithNoAgents?: boolean,
		options?: FindOptions<IUser>,
	) {
        /* Implementation Hidden */
    }

	findAgents<T extends Document = ILivechatAgent>() {
        /* Implementation Hidden */
    }

	countAgents() {
        /* Implementation Hidden */
    }

	// 2
	async getNextAgent(
		ignoreAgentId?: string,
		extraQuery?: Filter<AvailableAgentsAggregation>,
		enabledWhenAgentIdle?: boolean,
		acceptChatsWithNoAgents?: boolean,
	) {
        /* Implementation Hidden */
    }

	async getNextBotAgent(ignoreAgentId?: string) {
        /* Implementation Hidden */
    }

	setLivechatStatus(userId: IUser['_id'], status: ILivechatAgentStatus) {
        /* Implementation Hidden */
    }

	makeAgentUnavailable(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	// TODO: improve type of livechatData
	setLivechatData(userId: IUser['_id'], data: Record<string, unknown> = {}) {
        /* Implementation Hidden */
    }

	getAgentInfo(
		agentId: IUser['_id'],
		showAgentEmail = false,
	): Promise<Pick<ILivechatAgent, '_id' | 'name' | 'username' | 'phone' | 'customFields' | 'status' | 'livechat' | 'emails'> | null> {
        /* Implementation Hidden */
    }

	roleBaseQuery(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	// eslint-disable-next-line @typescript-eslint/naming-convention
	setE2EPublicAndPrivateKeysByUserId(userId: IUser['_id'], { public_key, private_key }: { public_key: string; private_key: string }) {
        /* Implementation Hidden */
    }

	async rocketMailUnsubscribe(_id: IUser['_id'], createdAt: string) {
        /* Implementation Hidden */
    }

	async fetchKeysByUserId(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	disable2FAAndSetTempSecretByUserId(userId: IUser['_id'], tempToken: string) {
        /* Implementation Hidden */
    }

	enable2FAAndSetSecretAndCodesByUserId(userId: IUser['_id'], secret: string, backupCodes: string[]) {
        /* Implementation Hidden */
    }

	disable2FAByUserId(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	update2FABackupCodesByUserId(userId: IUser['_id'], backupCodes: string[]) {
        /* Implementation Hidden */
    }

	enableEmail2FAByUserId(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	disableEmail2FAByUserId(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	findByIdsWithPublicE2EKey(ids: IUser['_id'][], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	resetE2EKey(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	removeExpiredEmailCodeOfUserId(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	removeEmailCodeOfUserId(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	incrementInvalidEmailCodeAttempt(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	async maxInvalidEmailCodeAttemptsReached(userId: IUser['_id'], maxAttempts: number) {
        /* Implementation Hidden */
    }

	addEmailCodeByUserId(userId: IUser['_id'], code: string, expire: Date) {
        /* Implementation Hidden */
    }

	/**
	 * @param {IRole['_id'][]} roles the list of role ids
	 * @param {any} options
	 */
	findActiveUsersInRoles(roles: IRole['_id'][], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	countActiveUsersInRoles(roles: IRole['_id'][], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByUsernameAndServiceNameIgnoringCase(
		username: string | RegExp,
		userId: IUser['_id'],
		serviceName: string,
		options?: FindOptions<IUser>,
	) {
        /* Implementation Hidden */
    }

	findOneByEmailAddressAndServiceNameIgnoringCase(
		emailAddress: string,
		userId: IUser['_id'],
		serviceName: string,
		options?: FindOptions<IUser>,
	) {
        /* Implementation Hidden */
    }

	findOneByEmailAddress(emailAddress: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneWithoutLDAPByEmailAddress(emailAddress: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneAdmin(userId: IUser['_id'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByIdAndLoginToken(_id: IUser['_id'], token: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	override findOneById(userId: IUser['_id'], options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findOneActiveById(userId?: IUser['_id'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByIdOrUsername(idOrUsername: IUser['_id'] | IUser['username'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByRolesAndType<T extends Document = IUser>(roles: IRole['_id'][], type: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findPresenceUsersByIds(users: IUser['_id'][], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findUsersNotOffline(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	countUsersNotOffline(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findNotIdUpdatedFrom(uid: IUser['_id'], from: Date, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByIdAndRole(userId: IUser['_id'], role: string, options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	async findByRoomId(rid: IRoom['_id'], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findByUsername(username: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findByUsernames(usernames: string[], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findByUsernamesIgnoringCase(usernames: string[], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findActiveByUserIds(ids: IUser['_id'][], options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findActiveLocalGuests(idExceptions: IUser['_id'] | IUser['_id'][] = [], options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	countActiveLocalGuests(idExceptions: IUser['_id'] | IUser['_id'][] = []) {
        /* Implementation Hidden */
    }

	// 4
	findUsersByNameOrUsername(nameOrUsername: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findByUsernameNameOrEmailAddress(usernameNameOrEmailAddress: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findCrowdUsers(options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	async getLastLogin(options: FindOptions<IUser> = { projection: { _id: 0, lastLogin: 1 } }) {
        /* Implementation Hidden */
    }

	findUsersByUsernames<T extends Document = IUser>(usernames: string[], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findUsersByIds(ids: IUser['_id'][], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findUsersWithUsernameByIds(ids: IUser['_id'][], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findUsersWithUsernameByIdsNotOffline(ids: IUser['_id'][], options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	/**
	 * @param {import('mongodb').Filter<import('@rocket.chat/core-typings').IStats>} projection
	 */
	getOldest(optionsParams?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	countRemote(options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findActiveRemote(options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	findActiveFederated(options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	getSAMLByIdAndSAMLProvider(_id: IUser['_id'], provider: string) {
        /* Implementation Hidden */
    }

	findBySAMLNameIdOrIdpSession(nameID: string, idpSession: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	countBySAMLNameIdOrIdpSession(nameID: string, idpSession: string) {
        /* Implementation Hidden */
    }

	findBySAMLInResponseTo(inResponseTo: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	findOneByFreeSwitchExtension<T extends Document = IUser>(freeSwitchExtension: string, options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	// UPDATE
	addImportIds(_id: IUser['_id'], importIds: string[]) {
        /* Implementation Hidden */
    }

	updateInviteToken(_id: IUser['_id'], inviteToken: string) {
        /* Implementation Hidden */
    }

	updateLastLoginById(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	addPasswordToHistory(_id: IUser['_id'], password: string, passwordHistoryAmount: number) {
        /* Implementation Hidden */
    }

	setServiceId(_id: IUser['_id'], serviceName: string, serviceId: string) {
        /* Implementation Hidden */
    }

	setUsername(_id: IUser['_id'], username: string, options?: UpdateOptions) {
        /* Implementation Hidden */
    }

	setEmail(_id: IUser['_id'], email: string, verified = false, options?: UpdateOptions) {
        /* Implementation Hidden */
    }

	// 5
	setEmailVerified(_id: IUser['_id'], email: string) {
        /* Implementation Hidden */
    }

	setName(_id: IUser['_id'], name: string, options?: UpdateOptions) {
        /* Implementation Hidden */
    }

	unsetName(_id: IUser['_id'], options?: UpdateOptions) {
        /* Implementation Hidden */
    }

	setCustomFields(_id: IUser['_id'], fields: Record<string, string>) {
        /* Implementation Hidden */
    }

	setAvatarData(_id: IUser['_id'], origin: string, etag: string, options?: UpdateOptions) {
        /* Implementation Hidden */
    }

	unsetAvatarData(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	setUserActive(_id: IUser['_id'], active: boolean | null) {
        /* Implementation Hidden */
    }

	/**
	 * @param latestLastLoginDate
	 * @param {IRole['_id']} role the role id
	 * @param {boolean} active
	 */
	setActiveNotLoggedInAfterWithRole(latestLastLoginDate: Date, role: IRole['_id'] = 'user', active = false) {
        /* Implementation Hidden */
    }

	findActiveNotLoggedInAfterWithRole(latestLastLoginDate: Date, role: IRole['_id'] = 'user', options: FindOptions<IUser> = {}) {
        /* Implementation Hidden */
    }

	unsetRequirePasswordChange(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	resetPasswordAndSetRequirePasswordChange(_id: IUser['_id'], requirePasswordChange: boolean, requirePasswordChangeReason: string) {
        /* Implementation Hidden */
    }

	setLanguage(_id: IUser['_id'], language: string) {
        /* Implementation Hidden */
    }

	setProfile(_id: IUser['_id'], profile: Record<string, unknown>) {
        /* Implementation Hidden */
    }

	setBio(_id: IUser['_id'], bio = '') {
        /* Implementation Hidden */
    }

	setNickname(_id: IUser['_id'], nickname = '') {
        /* Implementation Hidden */
    }

	clearSettings(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	setPreferences(_id: IUser['_id'], preferences: Record<string, string>) {
        /* Implementation Hidden */
    }

	setTwoFactorAuthorizationHashAndUntilForUserIdAndToken(_id: IUser['_id'], token: string, hash: string, until: Date) {
        /* Implementation Hidden */
    }

	setUtcOffset(_id: IUser['_id'], utcOffset: number) {
        /* Implementation Hidden */
    }

	setReason(_id: IUser['_id'], reason: string) {
        /* Implementation Hidden */
    }

	unsetReason(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	async bannerExistsById(_id: IUser['_id'], bannerId: string) {
        /* Implementation Hidden */
    }

	setBannerReadById(_id: IUser['_id'], bannerId: string) {
        /* Implementation Hidden */
    }

	removeBannerById(_id: IUser['_id'], bannerId: string) {
        /* Implementation Hidden */
    }

	async setBannersInBulk(updates: { userId: IUser['_id']; banners: NonNullable<IUser['banners']> }[]) {
        /* Implementation Hidden */
    }

	removeSamlServiceSession(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	updateDefaultStatus(_id: IUser['_id'], statusDefault: UserStatus) {
        /* Implementation Hidden */
    }

	setSamlInResponseTo(_id: IUser['_id'], inResponseTo: string) {
        /* Implementation Hidden */
    }

	// INSERT
	create(data: InsertionModel<IUser>) {
        /* Implementation Hidden */
    }

	// REMOVE
	override removeById(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	removeLivechatData(userId: IUser['_id']) {
        /* Implementation Hidden */
    }

	/*
		Find users to send a message by email if:
		- he is not online
		- has a verified email
		- has not disabled email notifications
		- `active` is equal to true (false means they were deactivated and can't login)
	*/
	getUsersToSendOfflineEmail(usersIds: IUser['_id'][]) {
        /* Implementation Hidden */
    }

	countActiveUsersByService(serviceName: string, options?: FindOptions<IUser>) {
        /* Implementation Hidden */
    }

	// here
	async getActiveLocalUserCount() {
        /* Implementation Hidden */
    }

	getActiveLocalGuestCount(idExceptions = []) {
        /* Implementation Hidden */
    }

	removeOlderResumeTokensByUserId(userId: IUser['_id'], fromDate: Date) {
        /* Implementation Hidden */
    }

	findAllUsersWithPendingAvatar() {
        /* Implementation Hidden */
    }

	countAllUsersWithPendingAvatar() {
        /* Implementation Hidden */
    }

	updateCustomFieldsById(userId: IUser['_id'], customFields: Record<string, unknown>) {
        /* Implementation Hidden */
    }

	countRoomMembers(roomId: IRoom['_id']) {
        /* Implementation Hidden */
    }

	removeAgent(_id: IUser['_id']) {
        /* Implementation Hidden */
    }

	countByRole(role: IRole['_id']) {
        /* Implementation Hidden */
    }

	updateLivechatStatusByAgentIds(userIds: IUser['_id'][], status: ILivechatAgentStatus) {
        /* Implementation Hidden */
    }

	countActiveUsersInNonDMRoom(rid: string) {
        /* Implementation Hidden */
    }

	async countActiveUsersInDMRoom(rid: string) {
        /* Implementation Hidden */
    }
}

```