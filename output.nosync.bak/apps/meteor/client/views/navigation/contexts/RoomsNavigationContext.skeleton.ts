## File: apps/meteor/client/views/navigation/contexts/RoomsNavigationContext.ts

```typescript
import { type ISubscription, type ILivechatInquiryRecord, type IRoom, isTeamRoom, isDirectMessageRoom } from '@rocket.chat/core-typings';
import { useStableCallback, useLocalStorage } from '@rocket.chat/fuselage-hooks';
import type { Keys as IconName } from '@rocket.chat/icons';
import { isTruthy } from '@rocket.chat/tools';
import type { SubscriptionWithRoom, TranslationKey } from '@rocket.chat/ui-contexts';
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';

import { useCollapsedGroups } from '../hooks/useCollapsedGroups';

export const sidePanelFiltersConfig: { [Key in AllGroupsKeys]: { title: TranslationKey; icon: IconName } } = {
	all: {
		title: 'All',
		icon: 'inbox',
	},
	favorites: {
		title: 'Favorites',
		icon: 'star',
	},
	mentions: {
		title: 'Mentions',
		icon: 'at',
	},
	discussions: {
		title: 'Discussions',
		icon: 'balloons',
	},
	inProgress: {
		title: 'In_progress',
		icon: 'user-arrow-right',
	},
	queue: {
		title: 'Queue',
		icon: 'burger-arrow-left',
	},
	onHold: {
		title: 'On_Hold',
		icon: 'pause-unfilled',
	},
	teams: {
		title: 'Teams',
		icon: 'team',
	},
	channels: {
		title: 'Channels',
		icon: 'hashtag',
	},
	directMessages: {
		title: 'Direct_Messages',
		icon: 'at',
	},
	unread: {
		title: 'Unread',
		icon: 'flag',
	},
	conversations: {
		title: 'Conversations',
		icon: 'chat',
	},
};

export type SidePanelFiltersKeys = 'all' | 'mentions' | 'favorites' | 'discussions' | 'inProgress' | 'queue' | 'onHold';

export const collapsibleFilters: SideBarFiltersKeys[] = ['unread', 'conversations', 'teams', 'channels', 'directMessages'];
export type SidePanelFiltersUnreadKeys = `${SidePanelFiltersKeys}_unread`;
export type SidePanelFilters = SidePanelFiltersKeys | SidePanelFiltersUnreadKeys;

export type SideBarFiltersKeys = 'teams' | 'channels' | 'directMessages' | 'conversations' | 'unread';
export type SideBarFiltersUnreadKeys = `${SideBarFiltersKeys}_unread`;
export type SideBarFilters = SidePanelFiltersKeys | SidePanelFiltersUnreadKeys;

export type AllGroupsKeys = SidePanelFiltersKeys | SideBarFiltersKeys;

export type AllGroupsKeysWithUnread = SidePanelFilters | SideBarFiltersKeys | SideBarFiltersUnreadKeys;

export type RecordTypeBySidebarKey<K extends AllGroupsKeysWithUnread> = K extends 'queue' ? ILivechatInquiryRecord : SubscriptionWithRoom;

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface RoomsNavigationGroup extends Map<AllGroupsKeysWithUnread, Set<RecordTypeBySidebarKey<AllGroupsKeysWithUnread>>> {
	get<K extends AllGroupsKeysWithUnread>(key: K): Set<RecordTypeBySidebarKey<K>> | undefined;
}

export type RoomsNavigationContextValue = {
	groups: RoomsNavigationGroup;
	currentFilter: AllGroupsKeysWithUnread;
	setFilter: (filter: AllGroupsKeys, unread: boolean, parentRid?: IRoom['_id']) => void;
	unreadGroupData: Map<AllGroupsKeys, GroupedUnreadInfoData>;
	parentRid?: IRoom['_id'];
};

export type GroupedUnreadInfoData = {
	userMentions: number;
	groupMentions: number;
	tunread: string[];
	tunreadUser: string[];
	unread: number;
};

export const RoomsNavigationContext = createContext<RoomsNavigationContextValue | undefined>(undefined);

export const useRoomsListContext = () => {
    /* Implementation Hidden */
};

// Helper functions
export const splitFilter = (currentFilter: AllGroupsKeysWithUnread): [SidePanelFiltersKeys, boolean] => {
    /* Implementation Hidden */
};

export const getFilterKey = (tab: AllGroupsKeys, unread: boolean): AllGroupsKeysWithUnread => {
    /* Implementation Hidden */
};

export const getEmptyUnreadInfo = (): GroupedUnreadInfoData => ({
	userMentions: 0,
	groupMentions: 0,
	tunread: [],
	tunreadUser: [],
	unread: 0,
});

// Hooks
type RoomListGroup<T extends AllGroupsKeys> = {
	group: T;
	rooms: Array<T extends SideBarFiltersKeys ? SubscriptionWithRoom : ILivechatInquiryRecord>;
	unreadInfo: GroupedUnreadInfoData;
};

export const useSideBarRoomsList = (): {
	roomListGroups: RoomListGroup<SideBarFiltersKeys>[];
	groupCounts: number[];
	totalCount: number;
} & ReturnType<typeof useCollapsedGroups> => {
    /* Implementation Hidden */
};

export const isUnreadSubscription = (subscription: Partial<ISubscription>): boolean => {
    /* Implementation Hidden */
};

export const useSidePanelQueueListTab = (): Array<ILivechatInquiryRecord> => {
    /* Implementation Hidden */
};

export const useSidePanelRoomsListTab = <K extends Exclude<AllGroupsKeys, 'queue'>>(tab: K): Array<RecordTypeBySidebarKey<K>> => {
    /* Implementation Hidden */
};

export const useSidePanelFilter = (): [AllGroupsKeys, boolean, AllGroupsKeysWithUnread, (filter: AllGroupsKeysWithUnread) => void] => {
    /* Implementation Hidden */
};

export const useUnreadOnlyToggle = (): [boolean, () => void] => {
    /* Implementation Hidden */
};

export const useSwitchSidePanelTab = () => {
    /* Implementation Hidden */
};

export const useUnreadGroupData = (key: SidePanelFiltersKeys) => useRoomsListContext().unreadGroupData.get(key) || getEmptyUnreadInfo();

export const useIsRoomFilter = () => {
    /* Implementation Hidden */
};

export const useRedirectToDefaultTab = (shouldRedirect: boolean) => {
    /* Implementation Hidden */
};

export const useRedirectToFilter = () => {
    /* Implementation Hidden */
};

```