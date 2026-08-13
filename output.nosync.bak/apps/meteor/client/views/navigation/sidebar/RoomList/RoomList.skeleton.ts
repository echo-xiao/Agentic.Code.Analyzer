## File: apps/meteor/client/views/navigation/sidebar/RoomList/RoomList.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import { VirtualizedScrollbars } from '@rocket.chat/ui-client';
import { useUserId } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedVirtuoso } from 'react-virtuoso';

import RoomListCollapser from './RoomListCollapser';
import RoomsListFilters from './RoomListFilters';
import RoomListRow from './RoomListRow';
import RoomListRowWrapper from './RoomListRowWrapper';
import RoomListWrapper from './RoomListWrapper';
import { useOpenedRoom } from '../../../../lib/RoomManager';
import { useSideBarRoomsList, sidePanelFiltersConfig } from '../../contexts/RoomsNavigationContext';
import { usePreventDefault } from '../hooks/usePreventDefault';
import { useShortcutOpenMenu } from '../hooks/useShortcutOpenMenu';

const RoomList = () => {
    /* Implementation Hidden */
};

export default RoomList;

```