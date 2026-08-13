## File: apps/meteor/client/views/navigation/sidebar/RoomList/RoomListRow.tsx

```typescript
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useVideoConfAcceptCall, useVideoConfRejectIncomingCall, useVideoConfIncomingCalls } from '@rocket.chat/ui-video-conf';
import type { TFunction } from 'i18next';
import { memo, useMemo } from 'react';

import SidebarItemWithData from './SidebarItemWithData';

export type RoomListRowProps = {
	data: {
		t: TFunction;
		openedRoom: string;
		isAnonymous: boolean;
	};
	item: SubscriptionWithRoom;
};

const RoomListRow = ({ data, item }: RoomListRowProps) => {
    /* Implementation Hidden */
};

export default memo(RoomListRow);

```