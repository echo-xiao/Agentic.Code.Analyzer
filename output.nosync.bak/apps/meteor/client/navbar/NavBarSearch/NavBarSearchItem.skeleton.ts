## File: apps/meteor/client/navbar/NavBarSearch/NavBarSearchItem.tsx

```typescript
import { SidebarV2Item, SidebarV2ItemAvatarWrapper, SidebarV2ItemTitle } from '@rocket.chat/fuselage';
import type { HTMLAttributes, ReactNode } from 'react';

export type NavBarSearchItemProps = {
	title: string;
	avatar: ReactNode;
	icon: ReactNode;
	actions?: ReactNode;
	href?: string;
	unread?: boolean;
	selected?: boolean;
	badges?: ReactNode;
	clickable?: boolean;
} & Omit<HTMLAttributes<HTMLAnchorElement>, 'is'>;

const NavBarSearchItem = ({ icon, title, avatar, actions, unread, badges, ...props }: NavBarSearchItemProps) => {
    /* Implementation Hidden */
};

export default NavBarSearchItem;

```