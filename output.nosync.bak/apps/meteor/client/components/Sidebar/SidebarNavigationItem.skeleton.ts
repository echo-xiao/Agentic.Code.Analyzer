## File: apps/meteor/client/components/Sidebar/SidebarNavigationItem.tsx

```typescript
import { Box, Icon, Tag } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import type { ReactNode } from 'react';
import { memo } from 'react';

import SidebarGenericItem from './SidebarGenericItem';

export type SidebarNavigationItemProps = {
	permissionGranted?: (() => boolean) | boolean;
	pathSection: string;
	icon?: IconName;
	label?: string;
	tag?: string;
	currentPath?: string;
	externalUrl?: boolean;
	badge?: () => ReactNode;
};

const SidebarNavigationItem = ({
	permissionGranted,
	pathSection,
	icon,
	label,
	currentPath,
	tag,
	externalUrl,
	// eslint-disable-next-line @typescript-eslint/naming-convention
	badge: Badge,
}: SidebarNavigationItemProps) => {
    /* Implementation Hidden */
};

export default memo(SidebarNavigationItem);

```