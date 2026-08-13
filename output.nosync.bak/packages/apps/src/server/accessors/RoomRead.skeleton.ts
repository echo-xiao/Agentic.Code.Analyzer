## File: packages/apps/src/server/accessors/RoomRead.ts

```typescript
import type { IRoomRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { IMessageRaw } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom, IRoomRaw } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { RoomBridge } from '../bridges';
import { type GetMessagesOptions, type GetRoomsFilters, type GetRoomsOptions, GetMessagesSortableFields } from '../bridges/RoomBridge';

export class RoomRead implements IRoomRead {
	constructor(
		private roomBridge: RoomBridge,
		private appId: string,
	) {
        /* Implementation Hidden */
    }

	public getById(id: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	public getCreatorUserById(id: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public getByName(name: string): Promise<IRoom> {
        /* Implementation Hidden */
    }

	public getCreatorUserByName(name: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public getMessages(roomId: string, options: Partial<GetMessagesOptions> = {}): Promise<IMessageRaw[]> {
        /* Implementation Hidden */
    }

	public getMembers(roomId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public getAllRooms(filters: GetRoomsFilters = {}, { limit = 100, skip = 0 }: GetRoomsOptions = {}): Promise<Array<IRoomRaw> | undefined> {
        /* Implementation Hidden */
    }

	public getDirectByUsernames(usernames: Array<string>): Promise<IRoom> {
        /* Implementation Hidden */
    }

	public getModerators(roomId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public getOwners(roomId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public getLeaders(roomId: string): Promise<Array<IUser>> {
        /* Implementation Hidden */
    }

	public async getUnreadByUser(roomId: string, uid: string, options: Partial<GetMessagesOptions> = {}): Promise<IMessageRaw[]> {
        /* Implementation Hidden */
    }

	public getUserUnreadMessageCount(roomId: string, uid: string): Promise<number> {
        /* Implementation Hidden */
    }

	// If there are any invalid fields or values, throw
	private validateSort(sort: Record<string, unknown>) {
        /* Implementation Hidden */
    }
}

```