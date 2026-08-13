## File: apps/meteor/client/views/navigation/sidebar/RoomList/SidebarItemWithData.tsx

```typescript
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { SidebarV2Action, SidebarV2Actions, SidebarV2ItemIcon } from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useUserId } from '@rocket.chat/ui-contexts';
import type { TFunction } from 'i18next';
import type { AllHTMLAttributes } from 'react';
import { memo, useMemo } from 'react';

import SidebarItem from './SidebarItem';
import { RoomIcon } from '../../../../components/RoomIcon';
import { useUserStatusTooltip } from '../../../../hooks/useUserStatusTooltip';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import { getUidDirectMessage } from '../../../../lib/utils/getUidDirectMessage';
import { useRoomsListContext, useIsRoomFilter, useRedirectToFilter } from '../../contexts/RoomsNavigationContext';
import SidebarItemBadges from '../badges/SidebarItemBadges';
import { useUnreadDisplay } from '../hooks/useUnreadDisplay';

type RoomListRowProps = {
	t: TFunction;
	openedRoom?: string;
	isAnonymous?: boolean;

	room: SubscriptionWithRoom;
	id?: string;
	/* @deprecated */
	style?: AllHTMLAttributes<HTMLElement>['style'];

	videoConfActions?: {
		[action: string]: () => void;
	};
};

const SidebarItemWithData = ({ room, id, style, t, videoConfActions }: RoomListRowProps) => {
    /* Implementation Hidden */
};

function safeDateNotEqualCheck(a: Date | string | undefined, b: Date | string | undefined): boolean {
    /* Implementation Hidden */
}

const keys: (keyof RoomListRowProps)[] = ['id', 'style', 't', 'videoConfActions'];

// eslint-disable-next-line react/no-multi-comp
export default memo(SidebarItemWithData, (prevProps, nextProps) => {
	if (keys.some((key) => prevProps[key] !== nextProps[key])) {
		return false;
	}

	if (prevProps.room === nextProps.room) {
		return true;
	}

	if (prevProps.room._id !== nextProps.room._id) {
		return false;
	}
	if (prevProps.room._updatedAt?.toISOString() !== nextProps.room._updatedAt?.toISOString()) {
		return false;
	}
	if (safeDateNotEqualCheck(prevProps.room.lastMessage?._updatedAt, nextProps.room.lastMessage?._updatedAt)) {
		return false;
	}
	if (prevProps.room.alert !== nextProps.room.alert) {
		return false;
	}
	if (isOmnichannelRoom(prevProps.room) && isOmnichannelRoom(nextProps.room) && prevProps.room?.v?.status !== nextProps.room?.v?.status) {
		return false;
	}
	if (prevProps.room.teamMain !== nextProps.room.teamMain) {
		return false;
	}

	if (
		isOmnichannelRoom(prevProps.room) &&
		isOmnichannelRoom(nextProps.room) &&
		prevProps.room.priorityWeight !== nextProps.room.priorityWeight
	) {
		return false;
	}

	return true;
});

```