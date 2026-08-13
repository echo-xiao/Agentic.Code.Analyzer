## File: apps/meteor/client/sidebar/badges/SidebarItemBadges.tsx

```typescript
import { isInviteSubscription, isOmnichannelRoom } from '@rocket.chat/core-typings';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';

import UnreadBadge from './UnreadBadge';
import InvitationBadge from '../../components/InvitationBadge';
import OmnichannelBadges from '../../views/omnichannel/components/OmnichannelBadges';
import { useUnreadDisplay } from '../hooks/useUnreadDisplay';

export type SidebarItemBadgesProps = {
	room: SubscriptionWithRoom;
	roomTitle?: string;
};

const SidebarItemBadges = ({ room, roomTitle }: SidebarItemBadgesProps) => {
    /* Implementation Hidden */
};

export default SidebarItemBadges;

```