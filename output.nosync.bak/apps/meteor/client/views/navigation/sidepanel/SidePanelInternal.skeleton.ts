## File: apps/meteor/client/views/navigation/sidepanel/SidePanelInternal.tsx

```typescript
import { Box, IconButton, Sidepanel, SidepanelHeader, SidepanelHeaderTitle, SidepanelListItem, ToggleSwitch } from '@rocket.chat/fuselage';
import { VirtualizedScrollbars } from '@rocket.chat/ui-client';
import { useLayout } from '@rocket.chat/ui-contexts';
import { useId, useRef, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import SidePanelNoResults from './SidePanelNoResults';
import SidepanelListWrapper from './SidepanelListWrapper';
import { useOpenedRoom } from '../../../lib/RoomManager';
import { useIsRoomFilter, type AllGroupsKeys } from '../contexts/RoomsNavigationContext';
import { usePreventDefault } from '../sidebar/hooks/usePreventDefault';

type SidePanelProps<R = any> = {
	title: string;
	currentTab: AllGroupsKeys;
	unreadOnly: boolean;
	toggleUnreadOnly: () => void;
	rooms: R[];
	ItemContentComponent: ComponentType<{
		room: R;
		openedRoom: ReturnType<typeof useOpenedRoom>;
		isRoomFilter: boolean;
	}>;
};

const SidePanelInternal = ({ title, currentTab, unreadOnly, toggleUnreadOnly, rooms, ItemContentComponent }: SidePanelProps) => {
    /* Implementation Hidden */
};

export const createSidePanel =
	<R extends object>(
		ItemContentComponent: ComponentType<{ room: R; openedRoom: ReturnType<typeof useOpenedRoom>; isRoomFilter: boolean }>,
	) =>
	// eslint-disable-next-line react/no-multi-comp, react/display-name
	({ title, currentTab, unreadOnly, toggleUnreadOnly, rooms }: Omit<SidePanelProps<R>, 'ItemContentComponent'>) => (
		<SidePanelInternal
			title={title}
			currentTab={currentTab}
			unreadOnly={unreadOnly}
			toggleUnreadOnly={toggleUnreadOnly}
			rooms={rooms}
			ItemContentComponent={ItemContentComponent}
		/>
	);

```