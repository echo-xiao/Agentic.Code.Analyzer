## File: apps/meteor/client/sidebar/Item/Extended.tsx

```typescript
import {
	SidebarV2Item,
	SidebarV2ItemAvatarWrapper,
	SidebarV2ItemCol,
	SidebarV2ItemRow,
	SidebarV2ItemTitle,
	SidebarV2ItemTimestamp,
	SidebarV2ItemContent,
	SidebarV2ItemMenu,
	IconButton,
} from '@rocket.chat/fuselage';
import type { HTMLAttributes, ReactNode } from 'react';
import { memo } from 'react';

import { useDeferredMenuMount } from './useDeferredMenuMount';
import { useShortTimeAgo } from '../../hooks/useTimeAgo';

export type ExtendedProps = {
	icon?: ReactNode;
	title: ReactNode;
	avatar?: ReactNode;
	actions?: ReactNode;
	href?: string;
	time?: any;
	menu?: () => ReactNode;
	subtitle?: ReactNode;
	badges?: ReactNode;
	unread?: boolean;
	selected?: boolean;
	menuOptions?: any;
	titleIcon?: ReactNode;
	threadUnread?: boolean;
} & Omit<HTMLAttributes<HTMLElement>, 'is'>;

const Extended = ({
	icon,
	title,
	avatar,
	actions,
	href,
	time,
	menu,
	menuOptions: _menuOptions,
	subtitle = '',
	titleIcon: _titleIcon,
	badges,
	threadUnread: _threadUnread,
	unread,
	selected,
	...props
}: ExtendedProps) => {
    /* Implementation Hidden */
};

export default memo(Extended);

```