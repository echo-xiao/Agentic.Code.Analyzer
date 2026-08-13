## File: apps/meteor/client/views/navigation/sidepanel/SidepanelItem/RoomSidePanelItem.tsx

```typescript
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { SidebarV2ItemIcon as SidebarItemIcon } from '@rocket.chat/fuselage';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { useUserId, type SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import RoomMenu from './RoomMenu';
import RoomSidePanelItemBadges from './RoomSidePanelItemBadges';
import SidePanelParent from './SidePanelParent';
import SidePanelItem from './SidepanelItem';
import { RoomIcon } from '../../../../components/RoomIcon';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import { isIOsDevice } from '../../../../lib/utils/isIOsDevice';
import { getMessagePreview } from '../../../../lib/utils/normalizeMessagePreview/getMessagePreview';
import { useOmnichannelPriorities } from '../../../omnichannel/hooks/useOmnichannelPriorities';
import { useUnreadDisplay } from '../../sidebar/hooks/useUnreadDisplay';

export type RoomSidePanelItemProps = {
	room: SubscriptionWithRoom;
	openedRoom?: string;
	isRoomFilter?: boolean;
};

const RoomSidePanelItem = ({ room, openedRoom, isRoomFilter, ...props }: RoomSidePanelItemProps) => {
    /* Implementation Hidden */
};

export default memo(RoomSidePanelItem);

```