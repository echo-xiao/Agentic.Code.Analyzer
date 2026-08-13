## File: apps/meteor/server/lib/rooms/roomTypes/conversation.ts

```typescript
import { getConversationRoomType } from '../../../../lib/rooms/roomTypes/conversation';
import { roomCoordinator } from '../roomCoordinator';

const ConversationRoomType = getConversationRoomType(roomCoordinator);

roomCoordinator.add(ConversationRoomType, {});

```