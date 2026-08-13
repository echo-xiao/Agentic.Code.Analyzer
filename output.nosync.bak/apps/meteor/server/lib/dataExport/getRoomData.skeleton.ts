## File: apps/meteor/server/lib/dataExport/getRoomData.ts

```typescript
import type { IRoom, IUser, RoomType } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';

export const getRoomData = async (
	roomId: IRoom['_id'],
	ownUserId?: IUser['_id'],
): Promise<
	| {
			roomId: string;
			roomName: string;
			userId: string | undefined;
			exportedCount: number;
			status: string;
			type: RoomType;
			targetFile: string;
	  }
	| Record<string, never>
> => {
    /* Implementation Hidden */
};

```