## File: apps/meteor/client/sidebar/Item/Medium.tsx

```typescript
import { IconButton, SidebarV2Item, SidebarV2ItemAvatarWrapper, SidebarV2ItemMenu, SidebarV2ItemTitle } from '@rocket.chat/fuselage';
import type { HTMLAttributes, ReactNode } from 'react';
import { memo } from 'react';

import { useDeferredMenuMount } from './useDeferredMenuMount';

export type MediumProps = {
	title: ReactNode;
	titleIcon?: ReactNode;
	avatar: ReactNode;
	icon?: ReactNode;
	actions?: ReactNode;
	href?: string;
	unread?: boolean;
	menu?: () => ReactNode;
	badges?: ReactNode;
	selected?: boolean;
	menuOptions?: any;
} & Omit<HTMLAttributes<HTMLElement>, 'is'>;

const Medium = ({ icon, title, avatar, actions, badges, unread, menu, ...props }: MediumProps) => {
    /* Implementation Hidden */
};

export default memo(Medium);

```