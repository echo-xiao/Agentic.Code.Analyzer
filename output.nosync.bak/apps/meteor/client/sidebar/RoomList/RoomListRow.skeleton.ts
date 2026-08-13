## File: apps/meteor/client/sidebar/RoomList/RoomListRow.tsx

```typescript
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useVideoConfAcceptCall, useVideoConfRejectIncomingCall, useVideoConfIncomingCalls } from '@rocket.chat/ui-video-conf';
import type { TFunction } from 'i18next';
import { memo, useMemo } from 'react';

import SidebarItemTemplateWithData from './SidebarItemTemplateWithData';
import type { useAvatarTemplate } from '../hooks/useAvatarTemplate';
import type { useTemplateByViewMode } from '../hooks/useTemplateByViewMode';

export type RoomListRowProps = {
	data: {
		extended: boolean;
		t: TFunction;
		SidebarItemTemplate: ReturnType<typeof useTemplateByViewMode>;
		AvatarTemplate: ReturnType<typeof useAvatarTemplate>;
		openedRoom: string;
		sidebarViewMode: 'extended' | 'condensed' | 'medium';
		isAnonymous: boolean;
		userId?: string;
	};
	item: SubscriptionWithRoom;
};

const RoomListRow = ({ data, item }: RoomListRowProps) => {
    /* Implementation Hidden */
};

export default memo(RoomListRow);

```