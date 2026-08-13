## File: apps/meteor/client/views/account/AccountRouter.tsx

```typescript
import { useRouter } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';

import AccountSidebar from './AccountSidebar';
import PageSkeleton from '../../components/PageSkeleton';
import SidebarPortal from '../../portals/SidebarPortal';

export type AccountRouterProps = {
	children?: ReactNode;
};

const AccountRouter = ({ children }: AccountRouterProps) => {
    /* Implementation Hidden */
};

export default AccountRouter;

```