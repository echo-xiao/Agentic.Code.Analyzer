## File: apps/meteor/client/views/omnichannel/reports/ReportsPage.tsx

```typescript
import { Box, Grid, GridItem } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { usePermission } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { AgentsSection, ChannelsSection, DepartmentsSection, StatusSection, TagsSection } from './sections';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const BREAKPOINTS = { xs: 4, sm: 8, md: 8, lg: 12, xl: 6 } as const;

const ReportsPage = () => {
    /* Implementation Hidden */
};

export default ReportsPage;

```