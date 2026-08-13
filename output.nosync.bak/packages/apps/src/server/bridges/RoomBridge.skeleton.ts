## File: packages/apps/src/server/bridges/RoomBridge.ts

```typescript
import type { IMessage, IMessageRaw } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom, IRoomRaw } from '@rocket.chat/apps-engine/definition/rooms';
import { GetMessagesSortableFields } from '@rocket.chat/apps-engine/definition/rooms/IGetMessagesOptions';
import type { GetMessagesOptions, GetRoomsFilters, GetRoomsOptions } from '@rocket.chat/apps-engine/definition/rooms/IGetMessagesOptions';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export { GetMessagesSortableFields };
export type { GetMessagesOptions, GetRoomsFilters, GetRoomsOptions };

const READ_ONLY_ROOM_FIELDS = ['abacAttributes'] as const;

const stripReadOnlyRoomFields = (room: IRoom): IRoom => {
    /* Implementation Hidden */
};

export abstract class RoomBridge extends BaseBridge {
	public async doCreate(room: IRoom, members: Array<string>, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public async doGetById(roomId: string, appId: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	public async doGetByName(roomName: string, appId: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	public async doGetCreatorById(roomId: string, appId: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	public async doGetCreatorByName(roomName: string, appId: string): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }

	public async doGetDirectByUsernames(usernames: Array<string>, appId: string): Promise<IRoom | undefined> {
        /* Implementation Hidden */
    }

	public async doGetMembers(roomId: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public async doGetAllRooms(
		filters: GetRoomsFilters = {},
		options: GetRoomsOptions = {},
		appId: string,
	): Promise<Array<IRoomRaw> | undefined> {
        /* Implementation Hidden */
    }

	public async doUpdate(room: IRoom, members: Array<string>, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doCreateDiscussion(
		room: IRoom,
		parentMessage: IMessage | undefined,
		reply: string | undefined,
		members: Array<string>,
		appId: string,
	): Promise<string> {
        /* Implementation Hidden */
    }

	public async doDelete(room: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doGetModerators(roomId: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public async doGetOwners(roomId: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public async doGetLeaders(roomId: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public async doGetMessages(roomId: string, options: GetMessagesOptions, appId: string): Promise<IMessageRaw[]> {
        /* Implementation Hidden */
    }

	public async doRemoveUsers(roomId: string, usernames: Array<string>, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doGetUnreadByUser(roomId: string, uid: string, options: GetMessagesOptions, appId: string): Promise<IMessageRaw[]> {
        /* Implementation Hidden */
    }

	public async doGetUserUnreadMessageCount(roomId: string, uid: string, appId: string): Promise<number> {
        /* Implementation Hidden */
    }

	protected abstract create(room: IRoom, members: Array<string>, appId: string): Promise<string>;

	protected abstract getById(roomId: string, appId: string): Promise<IRoom>;

	protected abstract getByName(roomName: string, appId: string): Promise<IRoom>;

	protected abstract getCreatorById(roomId: string, appId: string): Promise<IUser | undefined>;

	protected abstract getCreatorByName(roomName: string, appId: string): Promise<IUser | undefined>;

	protected abstract getDirectByUsernames(usernames: Array<string>, appId: string): Promise<IRoom | undefined>;

	protected abstract getMembers(roomId: string, appId: string): Promise<Array<IUser>>;

	protected abstract getAllRooms(filters: GetRoomsFilters, options: GetRoomsOptions, appId: string): Promise<Array<IRoomRaw>>;

	protected abstract update(room: IRoom, members: Array<string>, appId: string): Promise<void>;

	protected abstract createDiscussion(
		room: IRoom,
		parentMessage: IMessage | undefined,
		reply: string | undefined,
		members: Array<string>,
		appId: string,
	): Promise<string>;

	protected abstract delete(room: string, appId: string): Promise<void>;

	protected abstract getModerators(roomId: string, appId: string): Promise<Array<IUser>>;

	protected abstract getOwners(roomId: string, appId: string): Promise<Array<IUser>>;

	protected abstract getLeaders(roomId: string, appId: string): Promise<Array<IUser>>;

	protected abstract getMessages(roomId: string, options: GetMessagesOptions, appId: string): Promise<IMessageRaw[]>;

	protected abstract removeUsers(roomId: string, usernames: Array<string>, appId: string): Promise<void>;

	protected abstract getUnreadByUser(roomId: string, uid: string, options: GetMessagesOptions, appId: string): Promise<IMessageRaw[]>;

	protected abstract getUserUnreadMessageCount(roomId: string, uid: string, appId: string): Promise<number>;

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasViewAllRoomsPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```