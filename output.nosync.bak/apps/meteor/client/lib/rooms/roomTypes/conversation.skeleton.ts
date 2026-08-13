## File: apps/meteor/client/lib/rooms/roomTypes/conversation.ts

```typescript
import { getConversationRoomType } from '../../../../lib/rooms/roomTypes/conversation';
import { roomCoordinator } from '../roomCoordinator';

export const ConversationRoomType = getConversationRoomType(roomCoordinator);

roomCoordinator.add(
	{
		...ConversationRoomType,
		label: 'Conversations',
	},
	{},
);

```