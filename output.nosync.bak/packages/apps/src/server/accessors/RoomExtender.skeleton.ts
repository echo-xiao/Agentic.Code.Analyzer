## File: packages/apps/src/server/accessors/RoomExtender.ts

```typescript
import type { IRoomExtender } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { Utilities } from '../misc/Utilities';

export class RoomExtender implements IRoomExtender {
	public kind: RocketChatAssociationModel.ROOM;

	private members: Array<IUser>;

	constructor(private room: IRoom) {
        /* Implementation Hidden */
    }

	public addCustomField(key: string, value: any): IRoomExtender {
        /* Implementation Hidden */
    }

	public addMember(user: IUser): IRoomExtender {
        /* Implementation Hidden */
    }

	public getMembersBeingAdded(): Array<IUser> {
        /* Implementation Hidden */
    }

	public getUsernamesOfMembersBeingAdded(): Array<string> {
        /* Implementation Hidden */
    }

	public getRoom(): IRoom {
        /* Implementation Hidden */
    }
}

```