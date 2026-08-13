## File: apps/meteor/server/lib/rooms/roomTypes/unread.ts

```typescript
import { getUnreadRoomType } from '../../../../lib/rooms/roomTypes/unread';
import { roomCoordinator } from '../roomCoordinator';

const UnreadRoomType = getUnreadRoomType(roomCoordinator);

roomCoordinator.add(UnreadRoomType, {});

```