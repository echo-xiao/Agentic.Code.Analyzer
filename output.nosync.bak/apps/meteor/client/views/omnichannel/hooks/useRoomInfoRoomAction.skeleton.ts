## File: apps/meteor/client/views/omnichannel/hooks/useRoomInfoRoomAction.ts

```typescript
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';

const ChatsContextualBar = lazy(() => import('../directory/chats/ChatInfo/ChatsContextualBar'));

export const useRoomInfoRoomAction = () =>
	useMemo(
		(): RoomToolboxActionConfig => ({
			id: 'room-info',
			groups: ['live'],
			title: 'Room_Info',
			icon: 'info-circled',
			tabComponent: ChatsContextualBar,
			order: 0,
		}),
		[],
	);

```