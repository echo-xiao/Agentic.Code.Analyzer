## File: apps/meteor/client/views/admin/ABAC/AdminABACPage.tsx

```typescript
import { Box, Button, ButtonGroup, Callout } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarDialog, Page, PageContent, PageHeader } from '@rocket.chat/ui-client';
import { useSetting, useRouteParameter, useRouter } from '@rocket.chat/ui-contexts';
import { Trans, useTranslation } from 'react-i18next';

import AttributesContextualBar from './ABACAttributesTab/AttributesContextualBar';
import AttributesContextualBarWithData from './ABACAttributesTab/AttributesContextualBarWithData';
import AttributesPage from './ABACAttributesTab/AttributesPage';
import LogsPage from './ABACLogsTab/LogsPage';
import RoomsContextualBar from './ABACRoomsTab/RoomsContextualBar';
import RoomsContextualBarWithData from './ABACRoomsTab/RoomsContextualBarWithData';
import RoomsPage from './ABACRoomsTab/RoomsPage';
import SettingsPage from './ABACSettingTab/SettingsPage';
import AdminABACTabs from './AdminABACTabs';
import { useABACTabPermissions } from './hooks/useABACTabPermissions';
import { useIsABACAvailable } from './hooks/useIsABACAvailable';
import { useExternalLink } from '../../../hooks/useExternalLink';
import { useLdapSync } from '../../../hooks/useLdapSync';
import { links } from '../../../lib/links';

export type AdminABACPageProps = {
	shouldShowWarning: boolean;
};

const AdminABACPage = ({ shouldShowWarning }: AdminABACPageProps) => {
    /* Implementation Hidden */
};

export default AdminABACPage;

```