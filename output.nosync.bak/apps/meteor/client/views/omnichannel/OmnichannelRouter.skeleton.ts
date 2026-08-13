## File: apps/meteor/client/views/omnichannel/OmnichannelRouter.tsx

```typescript
import { useRouter } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';

import OmnichannelSidebar from './sidebar/OmnichannelSidebar';
import PageSkeleton from '../../components/PageSkeleton';
import SidebarPortal from '../../portals/SidebarPortal';

export type OmnichannelRouterProps = {
	children?: ReactNode;
};

const OmnichannelRouter = ({ children }: OmnichannelRouterProps) => {
    /* Implementation Hidden */
};

export default OmnichannelRouter;

```