## File: apps/meteor/app/apps/server/bridges/rooms.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import type { GetMessagesOptions, GetRoomsFilters, GetRoomsOptions } from '@rocket.chat/apps/dist/server/bridges/RoomBridge';
import { RoomBridge } from '@rocket.chat/apps/dist/server/bridges/RoomBridge';
import type { IMessage, IMessageRaw } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom, IRoomRaw } from '@rocket.chat/apps-engine/definition/rooms';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import type { ISubscription, IUser as ICoreUser, IRoom as ICoreRoom, IMessage as ICoreMessage } from '@rocket.chat/core-typings';
import { Subscriptions, Users, Rooms, Messages } from '@rocket.chat/models';
import type { FindOptions, Sort } from 'mongodb';

import { addUserToRoom } from '../../../../server/lib/rooms/addUserToRoom';
import { deleteRoom } from '../../../../server/lib/rooms/deleteRoom';
import { removeUserFromRoom } from '../../../../server/lib/rooms/removeUserFromRoom';
import { createDirectMessage } from '../../../../server/methods/createDirectMessage';
import { createDiscussion } from '../../../discussion/server/methods/createDiscussion';
import { createChannelMethod } from '../../../lib/server/methods/createChannel';
import { createPrivateGroupMethod } from '../../../lib/server/methods/createPrivateGroup';

const rawRoomProjection: FindOptions<ICoreRoom>['projection'] = {
	_id: 1,
	fname: 1,
	name: 1,
	usernames: 1,
	members: 1,
	uids: 1,
	default: 1,
	ro: 1,
	sysMes: 1,
	msgs: 1,
	ts: 1,
	_updatedAt: 1,
	closedAt: 1,
	lm: 1,
	description: 1,
	customFields: 1,
	prid: 1,
	teamId: 1,
	teamMain: 1,
	federated: 1,
	federation: 1,
	livechatData: 1,
	waitingResponse: 1,
	open: 1,
	source: 1,
	closer: 1,
	t: 1,
	u: 1,
	v: 1,
	contactId: 1,
	departmentId: 1,
	closedBy: 1,
	servedBy: 1,
	responseBy: 1,
};

export class AppRoomBridge extends RoomBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async create(room: IRoom, members: Array<string>, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	private prepareExtraData(room: Record<string, any>): Record<string, unknown> {
        /* Implementation Hidden */
    }

	private async createChannel(userId: string, room: ICoreRoom, members: string[]): Promise<string> {
        /* Implementation Hidden */
    }

	private async createDirectMessage(userId: string, members: string[]): Promise<string> {
        /* Implementation Hidden */
    }

	private async createPrivateGroup(userId: string, room: ICoreRoom, members: string[]): Promise<string> {
        /* Implementation Hidden */
    }

	protected async getById(roomId: string, appId: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	protected async getByName(roomName: string, appId: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	protected async getCreatorById(roomId: string, appId: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	protected async getCreatorByName(roomName: string, appId: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	protected async getMessages(roomId: string, options: GetMessagesOptions, appId: string): Promise<IMessageRaw[]> {
        /* Implementation Hidden */
    }

	protected async getMembers(roomId: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	protected async getAllRooms(filters: GetRoomsFilters = {}, options: GetRoomsOptions = {}, appId: string): Promise<Array<IRoomRaw>> {
        /* Implementation Hidden */
    }

	protected async getDirectByUsernames(usernames: Array<string>, appId: string): Promise<IRoom | undefined> {
        /* Implementation Hidden */
    }

	protected async update(room: IRoom, members: Array<string> = [], appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async delete(roomId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async createDiscussion(
		room: IRoom,
		parentMessage: IMessage | undefined = undefined,
		reply: string | undefined = '',
		members: Array<string> = [],
		appId: string,
	): Promise<string> {
        /* Implementation Hidden */
    }

	protected getModerators(roomId: string, appId: string): Promise<IUser[]> {
        /* Implementation Hidden */
    }

	protected getOwners(roomId: string, appId: string): Promise<IUser[]> {
        /* Implementation Hidden */
    }

	protected getLeaders(roomId: string, appId: string): Promise<IUser[]> {
        /* Implementation Hidden */
    }

	private async getUsersByRoomIdAndSubscriptionRole(roomId: string, role: string): Promise<IUser[]> {
        /* Implementation Hidden */
    }

	protected async getUnreadByUser(roomId: string, uid: string, options: GetMessagesOptions, appId: string): Promise<Array<IMessageRaw>> {
        /* Implementation Hidden */
    }

	protected async getUserUnreadMessageCount(roomId: string, uid: string, appId: string): Promise<number> {
        /* Implementation Hidden */
    }

	protected async removeUsers(roomId: string, usernames: Array<string>, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```