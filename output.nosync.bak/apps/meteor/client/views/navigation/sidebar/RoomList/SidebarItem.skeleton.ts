## File: apps/meteor/client/views/navigation/sidebar/RoomList/SidebarItem.tsx

```typescript
import { IconButton, SidebarV2Item, SidebarV2ItemAvatarWrapper, SidebarV2ItemMenu, SidebarV2ItemTitle } from '@rocket.chat/fuselage';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import type { HTMLAttributes, ReactNode } from 'react';
import { memo } from 'react';

import { useDeferredMenuMount } from '../../../../sidebar/Item/useDeferredMenuMount';

export type SidebarItemProps = {
	title: ReactNode;
	titleIcon?: ReactNode;
	icon?: ReactNode;
	actions?: ReactNode;
	href?: string;
	unread?: boolean;
	menu?: ReactNode;
	menuOptions?: any;
	selected?: boolean;
	badges?: ReactNode;
	clickable?: boolean;
	room: SubscriptionWithRoom;
} & Omit<HTMLAttributes<HTMLAnchorElement>, 'is'>;

const SidebarItem = ({ icon, title, actions, unread, menu, badges, room, ...props }: SidebarItemProps) => {
    /* Implementation Hidden */
};

export default memo(SidebarItem);

```