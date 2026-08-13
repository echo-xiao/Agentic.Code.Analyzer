## File: packages/apps/tests/test-data/bridges/roomBridge.ts

```typescript
import type { IMessage, IMessageRaw } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IRoomRaw } from '@rocket.chat/apps-engine/definition/rooms/IRoomRaw';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { RoomBridge } from '../../../src/server/bridges';
import type { GetMessagesOptions, GetRoomsOptions, GetRoomsFilters } from '../../../src/server/bridges/RoomBridge';

export class TestsRoomBridge extends RoomBridge {
	public create(room: IRoom, members: Array<string>, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public getById(roomId: string, appId: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	public getCreatorById(roomId: string, appId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public getByName(roomName: string, appId: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	public getCreatorByName(roomName: string, appId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public getDirectByUsernames(username: Array<string>, appId: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	public getMembers(roomName: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public getAllRooms(filter: GetRoomsFilters, options: GetRoomsOptions, appId: string): Promise<IRoomRaw[]> {
        /* Implementation Hidden */
    }

	public getMessages(roomId: string, options: GetMessagesOptions, appId: string): Promise<IMessageRaw[]> {
        /* Implementation Hidden */
    }

	public update(room: IRoom, members: Array<string>, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public createDiscussion(room: IRoom, parentMessage: IMessage, reply: string, members: Array<string>, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public delete(roomId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public getLeaders(roomId: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public getModerators(roomId: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public getOwners(roomId: string, appId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public removeUsers(roomId: string, usernames: string[], appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public getUnreadByUser(roomId: string, uid: string, options: GetMessagesOptions, appId: string): Promise<IMessageRaw[]> {
        /* Implementation Hidden */
    }

	protected getUserUnreadMessageCount(roomId: string, uid: string, appId: string): Promise<number> {
        /* Implementation Hidden */
    }
}

```