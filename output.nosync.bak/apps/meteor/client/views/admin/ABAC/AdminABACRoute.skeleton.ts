## File: apps/meteor/client/views/admin/ABAC/AdminABACRoute.tsx

```typescript
import { usePermission, useSetModal, useCurrentModal, useRouter, useRouteParameter, useSettingStructure } from '@rocket.chat/ui-contexts';
import { memo, useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AdminABACPage from './AdminABACPage';
import type { ABACTab } from './hooks/useABACTabPermissions';
import { ABAC_TAB_ORDER, useABACTabPermissions } from './hooks/useABACTabPermissions';
import { useIsExternalAttributeStore } from './hooks/useIsExternalAttributeStore';
import ABACUpsellModal from '../../../components/ABAC/ABACUpsellModal/ABACUpsellModal';
import { useUpsellActions } from '../../../components/GenericUpsellModal/hooks';
import PageSkeleton from '../../../components/PageSkeleton';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import SettingsProvider from '../../../providers/SettingsProvider';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';
import EditableSettingsProvider from '../settings/EditableSettingsProvider';

const AdminABACRoute = () => {
    /* Implementation Hidden */
};

export default memo(AdminABACRoute);

```