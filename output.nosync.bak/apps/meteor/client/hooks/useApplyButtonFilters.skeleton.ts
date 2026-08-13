## File: apps/meteor/client/hooks/useApplyButtonFilters.ts

```typescript
import type { IUIActionButton } from '@rocket.chat/apps-engine/definition/ui';
import { RoomTypeFilter } from '@rocket.chat/apps-engine/definition/ui';
import type { IRoom } from '@rocket.chat/core-typings';
import {
	isDirectMessageRoom,
	isMultipleDirectMessageRoom,
	isOmnichannelRoom,
	isPrivateDiscussion,
	isPrivateTeamRoom,
	isPublicDiscussion,
	isPublicTeamRoom,
} from '@rocket.chat/core-typings';
import { AuthorizationContext, useUserId } from '@rocket.chat/ui-contexts';
import { useCallback, useContext } from 'react';

import { useRoom } from '../views/room/contexts/RoomContext';

const enumToFilter: { [k in RoomTypeFilter]: (room: IRoom) => boolean } = {
	[RoomTypeFilter.PUBLIC_CHANNEL]: (room) => room.t === 'c',
	[RoomTypeFilter.PRIVATE_CHANNEL]: (room) => room.t === 'p',
	[RoomTypeFilter.PUBLIC_TEAM]: isPublicTeamRoom,
	[RoomTypeFilter.PRIVATE_TEAM]: isPrivateTeamRoom,
	[RoomTypeFilter.PUBLIC_DISCUSSION]: isPublicDiscussion,
	[RoomTypeFilter.PRIVATE_DISCUSSION]: isPrivateDiscussion,
	[RoomTypeFilter.DIRECT]: isDirectMessageRoom,
	[RoomTypeFilter.DIRECT_MULTIPLE]: isMultipleDirectMessageRoom,
	[RoomTypeFilter.LIVE_CHAT]: isOmnichannelRoom,
};

const applyRoomFilter = (button: IUIActionButton, room: IRoom): boolean => {
    /* Implementation Hidden */
};

const applyCategoryFilter = (button: IUIActionButton, category: string): boolean => {
    /* Implementation Hidden */
};

export const useApplyButtonFilters = (category = 'default'): ((button: IUIActionButton) => boolean) => {
    /* Implementation Hidden */
};

export const useApplyButtonAuthFilter = (): ((button: IUIActionButton) => boolean) => {
    /* Implementation Hidden */
};

```