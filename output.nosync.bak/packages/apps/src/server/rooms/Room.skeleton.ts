## File: packages/apps/src/server/rooms/Room.ts

```typescript
import type { IRoom, RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { AppManager } from '../AppManager';

const PrivateManager = Symbol('RoomPrivateManager');

export class Room implements IRoom {
	public id: string;

	public displayName?: string;

	public slugifiedName: string;

	public type: RoomType;

	public creator: IUser;

	public isDefault?: boolean;

	public isReadOnly?: boolean;

	public displaySystemMessages?: boolean;

	public messageCount?: number;

	public createdAt?: Date;

	public updatedAt?: Date;

	public lastModifiedAt?: Date;

	public customFields?: { [key: string]: any };

	public userIds?: Array<string>;

	private _USERNAMES: Array<string>;

	private [PrivateManager]: AppManager;

	/**
	 * @deprecated
	 */
	public get usernames(): Array<string> {
		// Get usernames
		if (!this._USERNAMES) {
			this._USERNAMES = this[PrivateManager].getBridges().getInternalBridge().doGetUsernamesOfRoomByIdSync(this.id);
		}

		return this._USERNAMES;
	}

	public set usernames(usernames) {}

	public constructor(room: IRoom, manager: AppManager) {
        /* Implementation Hidden */
    }

	get value(): object {
		return {
			id: this.id,
			displayName: this.displayName,
			slugifiedName: this.slugifiedName,
			type: this.type,
			creator: this.creator,
			isDefault: this.isDefault,
			isReadOnly: this.isReadOnly,
			displaySystemMessages: this.displaySystemMessages,
			messageCount: this.messageCount,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			lastModifiedAt: this.lastModifiedAt,
			customFields: this.customFields,
			userIds: this.userIds,
		};
	}

	public async getUsernames(): Promise<Array<string>> {
        /* Implementation Hidden */
    }

	public toJSON() {
        /* Implementation Hidden */
    }

	public toString() {
        /* Implementation Hidden */
    }

	public valueOf() {
        /* Implementation Hidden */
    }
}

```