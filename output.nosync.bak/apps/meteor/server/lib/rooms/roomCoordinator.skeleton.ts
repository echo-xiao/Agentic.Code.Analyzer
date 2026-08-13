## File: apps/meteor/server/lib/rooms/roomCoordinator.ts

```typescript
import { getUserDisplayName } from '@rocket.chat/core-typings';
import type { IRoom, RoomType, IUser, IMessage, ValueOf, AtLeast, IUpload } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { settings } from '../../../app/settings/server';
import type { IRoomTypeConfig, IRoomTypeServerDirectives, RoomSettingsEnum, RoomMemberActions } from '../../../definition/IRoomTypeConfig';
import { RoomCoordinator } from '../../../lib/rooms/coordinator';

class RoomCoordinatorServer extends RoomCoordinator {
	add(roomConfig: IRoomTypeConfig, directives: Partial<IRoomTypeServerDirectives>): void {
        /* Implementation Hidden */
    }

	getRoomDirectives(roomType: string): IRoomTypeServerDirectives {
        /* Implementation Hidden */
    }

	getTypesToShowOnDashboard(): Array<IRoomTypeConfig['identifier']> {
        /* Implementation Hidden */
    }

	async getRoomName(roomType: string, roomData: IRoom, userId?: string): Promise<string> {
        /* Implementation Hidden */
    }

	setRoomFind(roomType: string, roomFind: Required<Pick<IRoomTypeServerDirectives, 'roomFind'>>['roomFind']): void {
        /* Implementation Hidden */
    }

	getRoomFind(roomType: string): Required<Pick<IRoomTypeServerDirectives, 'roomFind'>>['roomFind'] | undefined {
        /* Implementation Hidden */
    }

	searchableRoomTypes(): Array<string> {
        /* Implementation Hidden */
    }
}

export const roomCoordinator = new RoomCoordinatorServer();

```