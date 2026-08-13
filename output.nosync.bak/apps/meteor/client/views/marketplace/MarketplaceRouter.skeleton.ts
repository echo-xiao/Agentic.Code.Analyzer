## File: apps/meteor/client/views/marketplace/MarketplaceRouter.tsx

```typescript
import { useAtLeastOnePermission, useRoute, useRouteParameter } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';

import MarketPlaceSidebar from './MarketplaceSidebar';
import PageSkeleton from '../../components/PageSkeleton';
import SidebarPortal from '../../portals/SidebarPortal';
import NotFoundPage from '../notFound/NotFoundPage';

export type MarketplaceRouterProps = { children?: ReactNode };

const MarketplaceRouter = ({ children }: MarketplaceRouterProps) => {
    /* Implementation Hidden */
};

export default MarketplaceRouter;

```