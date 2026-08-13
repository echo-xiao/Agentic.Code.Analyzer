## File: apps/meteor/client/views/admin/permissions/PermissionsPage.tsx

```typescript
import { Margins, Tabs, TabsItem, Button } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { usePagination, Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { useRoute, usePermission, useSetModal } from '@rocket.chat/ui-contexts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomRoleUpsellModal from './CustomRoleUpsellModal';
import PermissionsContextBar from './PermissionsContextBar';
import PermissionsTable from './PermissionsTable';
import { usePermissionsAndRoles } from './hooks/usePermissionsAndRoles';

export type PermissionsPageProps = { isEnterprise: boolean };

const PermissionsPage = ({ isEnterprise }: PermissionsPageProps) => {
    /* Implementation Hidden */
};

export default PermissionsPage;

```