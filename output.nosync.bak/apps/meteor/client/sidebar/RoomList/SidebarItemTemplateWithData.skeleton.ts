## File: apps/meteor/client/sidebar/RoomList/SidebarItemTemplateWithData.tsx

```typescript
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { SidebarV2Action, SidebarV2Actions, SidebarV2ItemIcon } from '@rocket.chat/fuselage';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useLayout } from '@rocket.chat/ui-contexts';
import type { TFunction } from 'i18next';
import type { AllHTMLAttributes, ComponentType, ReactNode } from 'react';
import { memo, useMemo } from 'react';

import { RoomIcon } from '../../components/RoomIcon';
import { useUserStatusTooltip } from '../../hooks/useUserStatusTooltip';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';
import { getUidDirectMessage } from '../../lib/utils/getUidDirectMessage';
import { isIOsDevice } from '../../lib/utils/isIOsDevice';
import { getMessagePreview } from '../../lib/utils/normalizeMessagePreview/getMessagePreview';
import { useOmnichannelPriorities } from '../../views/omnichannel/hooks/useOmnichannelPriorities';
import RoomMenu from '../RoomMenu';
import SidebarItemBadges from '../badges/SidebarItemBadges';
import type { useAvatarTemplate } from '../hooks/useAvatarTemplate';
import { useUnreadDisplay } from '../hooks/useUnreadDisplay';

type RoomListRowProps = {
	extended: boolean;
	t: TFunction;
	SidebarItemTemplate: ComponentType<
		{
			icon: ReactNode;
			title: ReactNode;
			avatar: ReactNode;
			actions: ReactNode;
			href: string;
			time?: Date;
			menu?: () => ReactNode;
			menuOptions?: unknown;
			subtitle?: ReactNode;
			titleIcon?: ReactNode;
			badges?: ReactNode;
			threadUnread?: boolean;
			unread?: boolean;
			selected?: boolean;
			is?: string;
		} & AllHTMLAttributes<HTMLElement>
	>;
	AvatarTemplate: ReturnType<typeof useAvatarTemplate>;
	openedRoom?: string;
	// sidebarViewMode: 'extended';
	isAnonymous?: boolean;
	userId?: string;

	room: SubscriptionWithRoom;
	id?: string;
	/* @deprecated */
	style?: AllHTMLAttributes<HTMLElement>['style'];

	selected?: boolean;

	sidebarViewMode?: unknown;
	videoConfActions?: {
		[action: string]: () => void;
	};
};

const SidebarItemTemplateWithData = ({
	room,
	id,
	selected,
	style,
	extended,
	SidebarItemTemplate,
	AvatarTemplate,
	t,
	isAnonymous,
	videoConfActions,
	userId,
}: RoomListRowProps) => {
    /* Implementation Hidden */
};

function safeDateNotEqualCheck(a: Date | string | undefined, b: Date | string | undefined): boolean {
    /* Implementation Hidden */
}

const keys: (keyof RoomListRowProps)[] = [
	'id',
	'style',
	'extended',
	'selected',
	'SidebarItemTemplate',
	'AvatarTemplate',
	't',
	'sidebarViewMode',
	'videoConfActions',
];

export default memo(SidebarItemTemplateWithData, (prevProps, nextProps) => {
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
	if (prevProps.room.lastMessage?.msg !== nextProps.room.lastMessage?.msg) {
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