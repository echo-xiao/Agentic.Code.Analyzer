## File: apps/meteor/client/views/navigation/sidebar/RoomList/RoomListFiltersItemBadge.tsx

```typescript
import { SidebarV2ItemBadge } from '@rocket.chat/fuselage';
import type { SubscriptionWithRoom, TranslationKey } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useUnreadDisplay } from '../hooks/useUnreadDisplay';

export type RoomListFiltersItemBadgeProps = {
	roomTitle: TranslationKey;
	unreadGroupCount: Pick<
		SubscriptionWithRoom,
		'alert' | 'userMentions' | 'unread' | 'tunread' | 'tunreadUser' | 'groupMentions' | 'hideMentionStatus' | 'hideUnreadStatus'
	>;
};

/**
 * TODO: This component can be optimized and used in multiple places.
 * The usage of the <span> to handle properly the aria label together with the
 * unread number could be moved to fuselage
 **/

const RoomListFiltersItemBadge = ({ roomTitle, unreadGroupCount }: RoomListFiltersItemBadgeProps) => {
    /* Implementation Hidden */
};

export default RoomListFiltersItemBadge;

```