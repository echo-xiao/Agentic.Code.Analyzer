## File: apps/meteor/server/services/team/service.ts

```typescript
import { Room, Authorization, Message, ServiceClassInternal, api } from '@rocket.chat/core-services';
import type {
	IListRoomsFilter,
	ITeamAutocompleteResult,
	ITeamCreateParams,
	ITeamInfo,
	ITeamMemberInfo,
	ITeamMemberParams,
	ITeamService,
	ITeamUpdateData,
} from '@rocket.chat/core-services';
import { TeamType } from '@rocket.chat/core-typings';
import type {
	IRoom,
	IUser,
	ISubscription,
	IPaginationOptions,
	IQueryOptions,
	IRecordsWithTotal,
	ITeam,
	ITeamMember,
	ITeamStats,
	AtLeast,
} from '@rocket.chat/core-typings';
import type { InsertionModel } from '@rocket.chat/model-typings';
import { Team, Rooms, Subscriptions, Users, TeamMember } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Document, FindOptions, Filter } from 'mongodb';

import { saveRoomName } from '../../../app/channel-settings/server';
import { saveRoomType } from '../../../app/channel-settings/server/functions/saveRoomType';
import { notifyOnSubscriptionChangedByRoomIdAndUserId, notifyOnRoomChangedById } from '../../../app/lib/server/lib/notifyListener';
import { settings } from '../../../app/settings/server';
import { addUserToRoom } from '../../lib/rooms/addUserToRoom';
import { getSubscribedRoomsForUserWithDetails } from '../../lib/rooms/getRoomsWithSingleOwner';
import { removeUserFromRoom } from '../../lib/rooms/removeUserFromRoom';
import { checkUsernameAvailability } from '../../lib/users/checkUsernameAvailability';

export class TeamService extends ServiceClassInternal implements ITeamService {
	protected name = 'team';

	async create(uid: string, { team, room = { name: team.name, extraData: {} }, members, owner }: ITeamCreateParams): Promise<ITeam> {
        /* Implementation Hidden */
    }

	async update(uid: string, teamId: string, updateData: ITeamUpdateData): Promise<void> {
        /* Implementation Hidden */
    }

	async findBySubscribedUserIds(userId: string, callerId?: string): Promise<ITeam[]> {
        /* Implementation Hidden */
    }

	search(userId: string, term: string | RegExp): Promise<ITeam[]>;

	search(userId: string, term: string | RegExp, options: FindOptions<ITeam>): Promise<ITeam[]>;

	search<P extends Document>(userId: string, term: string | RegExp, options: FindOptions<P extends ITeam ? ITeam : P>): Promise<P[]>;

	async search<P extends Document>(
		userId: string,
		term: string | RegExp,
		options?: FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
	): Promise<ITeam[] | P[]> {
        /* Implementation Hidden */
    }

	async list(
		uid: string,
		{ offset, count }: IPaginationOptions = { offset: 0, count: 50 },
		{ sort, query }: IQueryOptions<ITeam> = { sort: {} },
	): Promise<IRecordsWithTotal<ITeamInfo>> {
        /* Implementation Hidden */
    }

	async listAll({ offset, count }: IPaginationOptions = { offset: 0, count: 50 }): Promise<IRecordsWithTotal<ITeamInfo>> {
        /* Implementation Hidden */
    }

	listByNames(names: Array<string>): Promise<ITeam[]>;

	listByNames(names: Array<string>, options: FindOptions<ITeam>): Promise<ITeam[]>;

	listByNames<P extends Document>(names: Array<string>, options: FindOptions<P extends ITeam ? ITeam : P>): Promise<P[]>;

	async listByNames<P extends Document>(
		names: Array<string>,
		options?: FindOptions<ITeam> | FindOptions<P extends ITeam ? ITeam : P>,
	): Promise<P[] | ITeam[]> {
        /* Implementation Hidden */
    }

	async listByIds(ids: Array<string>, options?: FindOptions<ITeam>): Promise<ITeam[]> {
        /* Implementation Hidden */
    }

	async addRooms(uid: string, rooms: Array<string>, teamId: string): Promise<Array<IRoom>> {
        /* Implementation Hidden */
    }

	async removeRoom(uid: string, rid: string, teamId: string, canRemoveAnyRoom = false): Promise<IRoom> {
        /* Implementation Hidden */
    }

	async unsetTeamIdOfRooms(user: AtLeast<IUser, '_id' | 'username' | 'name'>, team: AtLeast<ITeam, '_id' | 'roomId'>): Promise<void> {
        /* Implementation Hidden */
    }

	async updateRoom(uid: string, rid: string, isDefault: boolean, canUpdateAnyRoom = false): Promise<IRoom> {
        /* Implementation Hidden */
    }

	listTeamsBySubscriberUserId(uid: string): Promise<ITeamMember[]>;

	listTeamsBySubscriberUserId(uid: string, options: FindOptions<ITeamMember>): Promise<ITeamMember[]>;

	listTeamsBySubscriberUserId<P extends Document>(uid: string, options: FindOptions<P>): Promise<P[]>;

	listTeamsBySubscriberUserId<P extends Document>(
		uid: string,
		options?: FindOptions<ITeamMember> | FindOptions<P extends ITeamMember ? ITeamMember : P>,
	): Promise<P[] | ITeamMember[]> {
        /* Implementation Hidden */
    }

	async listRooms(
		uid: string,
		teamId: string,
		filter: IListRoomsFilter,
		{ offset: skip, count: limit }: IPaginationOptions = { offset: 0, count: 50 },
	): Promise<IRecordsWithTotal<IRoom>> {
        /* Implementation Hidden */
    }

	async listRoomsOfUser(
		uid: string,
		teamId: string,
		userId: string,
		allowPrivateTeam: boolean,
		showCanDeleteOnly: boolean,
		{ offset: skip, count: limit }: IPaginationOptions = { offset: 0, count: 50 },
	): Promise<IRecordsWithTotal<IRoom>> {
        /* Implementation Hidden */
    }

	async getMatchingTeamRooms(teamId: string, rids: Array<string>): Promise<Array<string>> {
        /* Implementation Hidden */
    }

	async getMembersByTeamIds(teamIds: Array<string>, options: FindOptions<ITeamMember>): Promise<Array<ITeamMember>> {
        /* Implementation Hidden */
    }

	async members(
		uid: string,
		teamId: string,
		canSeeAll: boolean,
		{ offset, count }: IPaginationOptions = { offset: 0, count: 50 },
		query: Filter<IUser> = {},
	): Promise<IRecordsWithTotal<ITeamMemberInfo>> {
        /* Implementation Hidden */
    }

	async addMembers(uid: string, teamId: string, members: Array<ITeamMemberParams>): Promise<void> {
        /* Implementation Hidden */
    }

	async updateMember(teamId: string, member: ITeamMemberParams): Promise<void> {
        /* Implementation Hidden */
    }

	async removeMember(teamId: string, userId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async removeMembers(uid: string, teamId: string, members: Array<ITeamMemberParams>): Promise<boolean> {
        /* Implementation Hidden */
    }

	async insertMemberOnTeams(userId: string, teamIds: Array<string>): Promise<void> {
        /* Implementation Hidden */
    }

	async removeMemberFromTeams(userId: string, teamIds: Array<string>): Promise<void> {
        /* Implementation Hidden */
    }

	async removeAllMembersFromTeam(teamId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async addMember(inviter: Pick<IUser, '_id' | 'username'>, userId: string, teamId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	getAllPublicTeams(): Promise<ITeam[]>;

	getAllPublicTeams(options: FindOptions<ITeam>): Promise<ITeam[]>;

	async getAllPublicTeams(options?: FindOptions<ITeam>): Promise<ITeam[]> {
        /* Implementation Hidden */
    }

	async getOneById(teamId: string, options?: FindOptions<ITeam>): Promise<ITeam | null> {
        /* Implementation Hidden */
    }

	async getOneByName(teamName: string | RegExp): Promise<ITeam | null>;

	async getOneByName(teamName: string | RegExp, options: FindOptions<ITeam>): Promise<ITeam | null>;

	async getOneByName(teamName: string | RegExp, options?: FindOptions<ITeam>): Promise<ITeam | null> {
        /* Implementation Hidden */
    }

	async getOneByMainRoomId(roomId: string): Promise<Pick<ITeam, '_id'> | null> {
        /* Implementation Hidden */
    }

	async getOneByRoomId(roomId: string, options?: FindOptions<ITeam>): Promise<ITeam | null> {
        /* Implementation Hidden */
    }

	async addRolesToMember(teamId: string, userId: string, roles: Array<string>): Promise<boolean> {
        /* Implementation Hidden */
    }

	async addRolesToSubscription(roomId: string, userId: string, roles: Array<string>): Promise<boolean> {
        /* Implementation Hidden */
    }

	async removeRolesFromMember(teamId: string, userId: string, roles: Array<string>): Promise<boolean> {
        /* Implementation Hidden */
    }

	async getInfoByName(teamName: string): Promise<Omit<ITeam, 'usernames'> | null> {
        /* Implementation Hidden */
    }

	async getInfoById(teamId: string): Promise<Omit<ITeam, 'usernames'> | null> {
        /* Implementation Hidden */
    }

	async addMembersToDefaultRooms(
		inviter: Pick<IUser, '_id' | 'username'>,
		teamId: string,
		members: Array<Pick<ITeamMember, 'userId'>>,
	): Promise<void> {
        /* Implementation Hidden */
    }

	async deleteById(teamId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async deleteByName(teamName: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async getStatistics(): Promise<ITeamStats> {
        /* Implementation Hidden */
    }

	async autocomplete(uid: string, name: string): Promise<ITeamAutocompleteResult[]> {
        /* Implementation Hidden */
    }

	private getParentRoom(team: AtLeast<ITeam, 'roomId'>): Promise<Pick<IRoom, 'name' | 'fname' | 't' | '_id'> | null> {
        /* Implementation Hidden */
    }

	async getRoomInfo(
		room: AtLeast<IRoom, 'teamId' | 'teamMain' | '_id'>,
	): Promise<{ team?: Pick<ITeam, 'name' | 'roomId' | 'type'>; parentRoom?: Pick<IRoom, 'name' | 'fname' | 't' | '_id'> }> {
        /* Implementation Hidden */
    }

	// Returns the list of rooms and discussions a user has access to inside a team
	// Rooms returned are a composition of the rooms the user is in + public rooms + discussions from the main room (if any)
	async listChildren(
		userId: string,
		team: AtLeast<ITeam, '_id' | 'roomId' | 'type'>,
		filter?: string,
		type?: 'channels' | 'discussions',
		sort?: Record<string, 1 | -1>,
		skip = 0,
		limit = 10,
	): Promise<{ total: number; data: IRoom[] }> {
        /* Implementation Hidden */
    }
}

```