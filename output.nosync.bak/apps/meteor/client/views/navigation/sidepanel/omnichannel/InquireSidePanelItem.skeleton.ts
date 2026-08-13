## File: apps/meteor/client/views/navigation/sidepanel/omnichannel/InquireSidePanelItem.tsx

```typescript
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { SidebarV2ItemIcon as SidebarItemIcon } from '@rocket.chat/fuselage';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { useUserId } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import SidePanelOmnichannelBadges from './SidePanelOmnichannelBadges';
import { OmnichannelRoomIcon } from '../../../../components/RoomIcon/OmnichannelRoomIcon';
import type { LivechatInquiryLocalRecord } from '../../../../hooks/useLivechatInquiryStore';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import { isIOsDevice } from '../../../../lib/utils/isIOsDevice';
import { normalizeMessagePreview } from '../../../../lib/utils/normalizeMessagePreview/normalizeMessagePreview';
import { useOmnichannelPriorities } from '../../../omnichannel/hooks/useOmnichannelPriorities';
import SidePanelItem from '../SidepanelItem';
import RoomMenu from '../SidepanelItem/RoomMenu';

export type InquireSidePanelItemProps = {
	room: LivechatInquiryLocalRecord;
	openedRoom?: string;
};

const InquireSidePanelItem = ({ room, openedRoom, ...props }: InquireSidePanelItemProps) => {
    /* Implementation Hidden */
};

export default memo(InquireSidePanelItem);

```