## File: apps/meteor/server/api/lib/eraseTeam.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import { MeteorError, Team } from '@rocket.chat/core-services';
import type { IRoom, ITeam, IUser, AtLeast } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';

import { eraseRoom } from '../../lib/eraseRoom';
import { SystemLogger } from '../../lib/logger/system';
import { deleteRoom } from '../../lib/rooms/deleteRoom';

type EraseRoomFnType = <T extends AtLeast<IUser, '_id' | 'name' | 'username'>>(rid: string, user: T) => Promise<boolean | void>;

export const eraseTeamShared = async <T extends AtLeast<IUser, '_id' | 'name' | 'username'>>(
	user: T,
	team: ITeam,
	roomsToRemove: IRoom['_id'][] = [],
	eraseRoomFn: EraseRoomFnType,
) => {
    /* Implementation Hidden */
};

export const eraseTeam = async (user: IUser, team: ITeam, roomsToRemove: IRoom['_id'][]) => {
    /* Implementation Hidden */
};

/**
 * @param team
 * @param roomsToRemove
 * @returns deleted room ids
 */
export const eraseTeamOnRelinquishRoomOwnerships = async (team: ITeam, roomsToRemove: IRoom['_id'][] = []): Promise<string[]> => {
    /* Implementation Hidden */
};

export async function eraseRoomLooseValidation(rid: string): Promise<boolean> {
    /* Implementation Hidden */
}

```