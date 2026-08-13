## File: apps/meteor/client/views/navigation/providers/RoomsNavigationProvider.tsx

```typescript
import { isDirectMessageRoom, isDiscussion, isOmnichannelRoom, isPrivateRoom, isPublicRoom, isTeamRoom } from '@rocket.chat/core-typings';
import type { ILivechatInquiryRecord, IRoom } from '@rocket.chat/core-typings';
import { useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { SubscriptionWithRoom, TranslationKey } from '@rocket.chat/ui-contexts';
import { useSetting, useUserPreference, useUserSubscriptions, useLayout } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useEffect, useMemo } from 'react';

import { useSortQueryOptions } from '../../../hooks/useSortQueryOptions';
import { RoomManager } from '../../../lib/RoomManager';
import { Rooms } from '../../../stores';
import { useOmnichannelEnabled } from '../../omnichannel/hooks/useOmnichannelEnabled';
import { useQueuedInquiries } from '../../omnichannel/hooks/useQueuedInquiries';
import type {
	GroupedUnreadInfoData,
	AllGroupsKeys,
	AllGroupsKeysWithUnread,
	RoomsNavigationGroup,
} from '../contexts/RoomsNavigationContext';
import {
	RoomsNavigationContext,
	getEmptyUnreadInfo,
	getFilterKey,
	isUnreadSubscription,
	useSidePanelFilter,
} from '../contexts/RoomsNavigationContext';
import { useSidePanelParentRid } from '../hooks/useSidePanelParentRid';

const query = { open: { $ne: false } };

const emptyQueue: ILivechatInquiryRecord[] = [];

export type useRoomsGroupsReturnType = {
	sideBar: {
		roomList: Array<SubscriptionWithRoom>;
		groupsCount: number[];
		groupsList: TranslationKey[];
		groupedUnreadInfo: GroupedUnreadInfoData[];
	};
};

const updateGroupUnreadInfo = (room: SubscriptionWithRoom, current: GroupedUnreadInfoData): GroupedUnreadInfoData => {
    /* Implementation Hidden */
};

const hasMention = (room: SubscriptionWithRoom) =>
	room.userMentions || room.groupMentions || room.tunreadUser?.length || room.tunreadGroup?.length;

type UnreadGroupDataMap = Map<AllGroupsKeys, GroupedUnreadInfoData>;

const useRoomsGroups = (): [RoomsNavigationGroup, UnreadGroupDataMap] => {
    /* Implementation Hidden */
};

export type RoomsNavigationContextProviderProps = { children: ReactNode };

const RoomsNavigationContextProvider = ({ children }: RoomsNavigationContextProviderProps) => {
    /* Implementation Hidden */
};

export default RoomsNavigationContextProvider;

```