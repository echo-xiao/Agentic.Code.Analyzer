## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppSecurity/AppSecurity.tsx

```typescript
import type { AppPermission } from '@rocket.chat/core-typings';
import { Box, Margins } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import AppSecurityLabel from './AppSecurityLabel';
import AppPermissionsList from '../../../components/AppPermissionsList';

export type AppSecurityProps = {
	privacyPolicySummary?: string;
	appPermissions?: AppPermission[];
	tosLink?: string;
	privacyLink?: string;
};

const AppSecurity = ({ privacyPolicySummary, appPermissions, tosLink, privacyLink }: AppSecurityProps) => {
    /* Implementation Hidden */
};

export default AppSecurity;

```