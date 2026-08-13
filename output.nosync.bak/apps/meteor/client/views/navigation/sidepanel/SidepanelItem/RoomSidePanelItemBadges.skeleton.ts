## File: apps/meteor/client/views/navigation/sidepanel/SidepanelItem/RoomSidePanelItemBadges.tsx

```typescript
import { isInviteSubscription, isOmnichannelRoom } from '@rocket.chat/core-typings';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';

import InvitationBadge from '../../../../components/InvitationBadge';
import UnreadBadge from '../../sidebar/badges/UnreadBadge';
import { useUnreadDisplay } from '../../sidebar/hooks/useUnreadDisplay';
import SidePanelOmnichannelBadges from '../omnichannel/SidePanelOmnichannelBadges';

export type RoomSidePanelItemBadgesProps = {
	room: SubscriptionWithRoom;
	roomTitle?: string;
};

const RoomSidePanelItemBadges = ({ room, roomTitle }: RoomSidePanelItemBadgesProps) => {
    /* Implementation Hidden */
};

export default RoomSidePanelItemBadges;

```