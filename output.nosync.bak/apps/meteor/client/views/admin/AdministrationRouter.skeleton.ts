## File: apps/meteor/client/views/admin/AdministrationRouter.tsx

```typescript
import { useRouter } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';

import AdministrationLayout from './AdministrationLayout';
import { getAdminSidebarItems } from './sidebarItems';
import PageSkeleton from '../../components/PageSkeleton';
import type { Item, SidebarDivider, SidebarItem } from '../../lib/createSidebarItems';
import { isGoRocketChatLink } from '../../lib/createSidebarItems';
import SettingsProvider from '../../providers/SettingsProvider';

const isSidebarDivider = (sidebarItem: SidebarItem): sidebarItem is SidebarDivider => {
    /* Implementation Hidden */
};

const firstSidebarPage = (sidebarItem: SidebarItem): sidebarItem is Item => {
    /* Implementation Hidden */
};

export type AdministrationRouterProps = {
	children?: ReactNode;
};

const AdministrationRouter = ({ children }: AdministrationRouterProps) => {
    /* Implementation Hidden */
};

export default AdministrationRouter;

```