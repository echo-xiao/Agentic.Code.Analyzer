## File: apps/meteor/client/views/navigation/sidebar/RoomList/RoomListFiltersItem.tsx

```typescript
import { Icon, SidebarV2Item, SidebarV2ItemIcon, SidebarV2ItemTitle } from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import type { Keys as IconName } from '@rocket.chat/icons';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import RoomListFiltersItemBadge from './RoomListFiltersItemBadge';
import {
	type SidePanelFiltersKeys,
	sidePanelFiltersConfig,
	useSidePanelFilter,
	useSwitchSidePanelTab,
} from '../../contexts/RoomsNavigationContext';
import { useUnreadGroupData } from '../../contexts/RoomsNavigationContext';
import { useUnreadDisplay } from '../hooks/useUnreadDisplay';

type SidebarFiltersItemProps = {
	group: SidePanelFiltersKeys;
	icon: IconName;
};

const RoomListFiltersItem = ({ group, icon }: SidebarFiltersItemProps) => {
    /* Implementation Hidden */
};

export default memo(RoomListFiltersItem);

```