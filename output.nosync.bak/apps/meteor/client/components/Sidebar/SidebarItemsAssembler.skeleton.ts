## File: apps/meteor/client/components/Sidebar/SidebarItemsAssembler.tsx

```typescript
import { Divider } from '@rocket.chat/fuselage';
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';

import SidebarNavigationItem from './SidebarNavigationItem';
import type { SidebarItem } from '../../lib/createSidebarItems';
import { isSidebarItem } from '../../lib/createSidebarItems';

export type SidebarItemsAssemblerProps = {
	items: SidebarItem[];
	currentPath?: string;
};

const SidebarItemsAssembler = ({ items, currentPath }: SidebarItemsAssemblerProps) => {
    /* Implementation Hidden */
};

export default memo(SidebarItemsAssembler);

```