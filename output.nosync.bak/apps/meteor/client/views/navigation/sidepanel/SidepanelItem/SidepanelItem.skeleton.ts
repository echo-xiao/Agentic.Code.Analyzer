## File: apps/meteor/client/views/navigation/sidepanel/SidepanelItem/SidepanelItem.tsx

```typescript
import {
	IconButton,
	SidebarV2Item,
	SidebarV2ItemAvatarWrapper,
	SidebarV2ItemCol,
	SidebarV2ItemContent,
	SidebarV2ItemMenu,
	SidebarV2ItemRow,
	SidebarV2ItemTimestamp,
	SidebarV2ItemTitle,
} from '@rocket.chat/fuselage';
import { useLayout } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { memo, useState } from 'react';

import { useShortTimeAgo } from '../../../../hooks/useTimeAgo';

export type SidePanelItemProps = {
	href: string;
	selected: boolean;
	title: string;
	avatar: ReactNode;
	icon: ReactNode;
	unread: boolean;
	time?: Date;
	subtitle: ReactNode;
	parentRoom?: ReactNode;
	badges?: ReactNode;
	menu?: ReactNode;
};

const SidePanelItem = ({
	href,
	selected,
	title,
	avatar,
	icon,
	unread,
	time,
	subtitle,
	parentRoom,
	badges,
	menu,
	...props
}: SidePanelItemProps) => {
    /* Implementation Hidden */
};

export default memo(SidePanelItem);

```