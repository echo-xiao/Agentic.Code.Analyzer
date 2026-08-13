## File: apps/meteor/client/views/admin/deviceManagement/DeviceManagementAdminRoute.tsx

```typescript
import { usePermission, useRouter, useSetModal, useCurrentModal } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import DeviceManagementAdminPage from './DeviceManagementAdminPage';
import { getURL } from '../../../../app/utils/client/getURL';
import GenericUpsellModal from '../../../components/GenericUpsellModal';
import { useUpsellActions } from '../../../components/GenericUpsellModal/hooks';
import PageSkeleton from '../../../components/PageSkeleton';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const DeviceManagementAdminRoute = () => {
    /* Implementation Hidden */
};

export default DeviceManagementAdminRoute;

```