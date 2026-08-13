## File: apps/meteor/client/lib/rooms/roomTypes/unread.ts

```typescript
import { getUnreadRoomType } from '../../../../lib/rooms/roomTypes/unread';
import { roomCoordinator } from '../roomCoordinator';

export const UnreadRoomType = getUnreadRoomType(roomCoordinator);

roomCoordinator.add(
	{
		...UnreadRoomType,
		label: 'Unread',
	},
	{},
);

```