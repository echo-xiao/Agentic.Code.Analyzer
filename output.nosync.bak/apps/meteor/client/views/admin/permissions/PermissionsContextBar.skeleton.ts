## File: apps/meteor/client/views/admin/permissions/PermissionsContextBar.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarHeader, ContextualbarTitle, ContextualbarClose, ContextualbarDialog } from '@rocket.chat/ui-client';
import { useRouteParameter, useRoute, useTranslation, useSetModal } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import CustomRoleUpsellModal from './CustomRoleUpsellModal';
import EditRolePageWithData from './EditRolePageWithData';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

const PermissionsContextBar = () => {
    /* Implementation Hidden */
};

export default PermissionsContextBar;

```