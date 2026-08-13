## File: apps/meteor/client/views/admin/sidebar/AdminSidebarPages.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { memo, useSyncExternalStore } from 'react';

import SidebarItemsAssembler from '../../../components/Sidebar/SidebarItemsAssembler';
import { subscribeToAdminSidebarItems, getAdminSidebarItems } from '../sidebarItems';

export type AdminSidebarPagesProps = {
	currentPath: string;
};

const AdminSidebarPages = ({ currentPath }: AdminSidebarPagesProps) => {
    /* Implementation Hidden */
};

export default memo(AdminSidebarPages);

```