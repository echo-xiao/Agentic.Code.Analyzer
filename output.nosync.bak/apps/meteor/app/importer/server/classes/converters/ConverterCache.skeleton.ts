## File: apps/meteor/app/importer/server/classes/converters/ConverterCache.ts

```typescript
import type { IImportUser, IUser } from '@rocket.chat/core-typings';
import { Rooms, Users } from '@rocket.chat/models';

export type UserIdentification = {
	_id: string;
	username: string | undefined;
};

export type MentionedChannel = {
	_id: string;
	name: string;
};

export class ConverterCache {
	private _userCache = new Map<string, UserIdentification>();

	// display name uses a different cache because it's only used on mentions so we don't need to load it every time we load an user
	private _userDisplayNameCache = new Map<string, string>();

	private _userNameToIdCache = new Map<string, string | undefined>();

	private _roomCache = new Map<string, string>();

	private _roomNameCache = new Map<string, string>();

	addUser(importId: string, _id: string, username: string | undefined): UserIdentification {
        /* Implementation Hidden */
    }

	addUserDisplayName(importId: string, name: string): string {
        /* Implementation Hidden */
    }

	addRoom(importId: string, rid: string): string {
        /* Implementation Hidden */
    }

	addRoomName(importId: string, name: string): string {
        /* Implementation Hidden */
    }

	addUserData(userData: IImportUser): void {
        /* Implementation Hidden */
    }

	addUsernameToId(username: string, id: string): void {
        /* Implementation Hidden */
    }

	async findImportedRoomId(importId: string): Promise<string | null> {
        /* Implementation Hidden */
    }

	async findImportedRoomName(importId: string): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	async findImportedUser(importId: string): Promise<UserIdentification | null> {
        /* Implementation Hidden */
    }

	async findImportedUserId(_id: string): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	async findImportedUsername(_id: string): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	async findImportedUserDisplayName(importId: string): Promise<string | undefined> {
        /* Implementation Hidden */
    }

	async convertImportedIdsToUsernames(importedIds: Array<string>, idToRemove: string | undefined = undefined): Promise<Array<string>> {
        /* Implementation Hidden */
    }

	async getIdOfUsername(username: string | undefined): Promise<string | undefined> {
        /* Implementation Hidden */
    }
}

```