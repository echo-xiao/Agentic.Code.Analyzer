## File: apps/meteor/client/sidebar/RoomList/RoomListCollapser.tsx

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';
import { Badge, SidebarV2CollapseGroup } from '@rocket.chat/fuselage';
import type { HTMLAttributes, KeyboardEvent, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { useUnreadDisplay } from '../hooks/useUnreadDisplay';

export type RoomListCollapserProps = {
	groupTitle: string;
	collapsedGroups: string[];
	onClick: MouseEventHandler<HTMLElement>;
	onKeyDown: (e: KeyboardEvent) => void;
	unreadCount: Pick<ISubscription, 'userMentions' | 'groupMentions' | 'unread' | 'tunread' | 'tunreadUser' | 'tunreadGroup'>;
} & Omit<HTMLAttributes<HTMLElement>, 'onClick' | 'onKeyDown'>;
const RoomListCollapser = ({ groupTitle, unreadCount: unreadGroupCount, collapsedGroups, ...props }: RoomListCollapserProps) => {
    /* Implementation Hidden */
};

export default RoomListCollapser;

```