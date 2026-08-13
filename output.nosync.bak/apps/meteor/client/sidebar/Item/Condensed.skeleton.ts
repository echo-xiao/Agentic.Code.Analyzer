## File: apps/meteor/client/sidebar/Item/Condensed.tsx

```typescript
import { IconButton, SidebarV2Item, SidebarV2ItemAvatarWrapper, SidebarV2ItemMenu, SidebarV2ItemTitle } from '@rocket.chat/fuselage';
import type { HTMLAttributes, ReactNode } from 'react';
import { memo } from 'react';

import { useDeferredMenuMount } from './useDeferredMenuMount';

export type CondensedProps = {
	title: ReactNode;
	titleIcon?: ReactNode;
	avatar: ReactNode;
	icon?: ReactNode;
	actions?: ReactNode;
	href?: string;
	unread?: boolean;
	menu?: () => ReactNode;
	menuOptions?: any;
	selected?: boolean;
	badges?: ReactNode;
	clickable?: boolean;
} & Omit<HTMLAttributes<HTMLAnchorElement>, 'is'>;

const Condensed = ({ icon, title, avatar, actions, unread, menu, badges, ...props }: CondensedProps) => {
    /* Implementation Hidden */
};

export default memo(Condensed);

```