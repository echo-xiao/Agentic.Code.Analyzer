## File: packages/apps/base-runtime/src/lib/accessors/extenders/RoomExtender.ts

```typescript
import type { IRoomExtender } from '@rocket.chat/apps-engine/definition/accessors/IRoomExtender';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/RocketChatAssociations';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';
import type { IUser } from '@rocket.chat/apps-engine/definition/users/IUser';

export class RoomExtender implements IRoomExtender {
	public kind: RocketChatAssociationModel.ROOM;

	private members: Array<IUser>;

	constructor(private room: IRoom) {
        /* Implementation Hidden */
    }

	public addCustomField(key: string, value: unknown): IRoomExtender {
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