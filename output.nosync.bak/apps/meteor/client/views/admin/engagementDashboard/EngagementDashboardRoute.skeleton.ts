## File: apps/meteor/client/views/admin/engagementDashboard/EngagementDashboardRoute.tsx

```typescript
import {
	usePermission,
	useRouter,
	useSetModal,
	useCurrentModal,
	useTranslation,
	useRouteParameter,
	useEndpoint,
} from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import EngagementDashboardPage from './EngagementDashboardPage';
import { getURL } from '../../../../app/utils/client/getURL';
import GenericUpsellModal from '../../../components/GenericUpsellModal';
import { useUpsellActions } from '../../../components/GenericUpsellModal/hooks';
import PageSkeleton from '../../../components/PageSkeleton';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const isValidTab = (tab: string | undefined): tab is 'users' | 'messages' | 'channels' =>
	typeof tab === 'string' && ['users', 'messages', 'channels'].includes(tab);

const EngagementDashboardRoute = () => {
    /* Implementation Hidden */
};

export default EngagementDashboardRoute;

```