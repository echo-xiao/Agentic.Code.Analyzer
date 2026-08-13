## File: apps/meteor/client/views/marketplace/AppDetailsPage/AppDetailsPage.tsx

```typescript
import type { App, SettingValue } from '@rocket.chat/core-typings';
import { Button, ButtonGroup, Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { Page, PageFooter, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useTranslation, useRouteParameter, useToastMessageDispatch, usePermission, useRouter } from '@rocket.chat/ui-contexts';
import { useMemo, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import AppDetailsPageHeader from './AppDetailsPageHeader';
import AppDetailsPageLoading from './AppDetailsPageLoading';
import AppDetailsPageTabs from './AppDetailsPageTabs';
import { handleAPIError } from '../helpers/handleAPIError';
import { useAppInfo } from '../hooks/useAppInfo';
import AppDetails from './tabs/AppDetails';
import AppInstances from './tabs/AppInstances';
import AppLogs from './tabs/AppLogs';
import { AppLogsFilterContextualBar } from './tabs/AppLogs/Filters/AppLogsFilterContextualBar';
import { useAppLogsFilterForm } from './tabs/AppLogs/useAppLogsFilterForm';
import AppReleases from './tabs/AppReleases';
import AppRequests from './tabs/AppRequests/AppRequests';
import AppSecurity from './tabs/AppSecurity/AppSecurity';
import AppSettings from './tabs/AppSettings';
import { useCompactMode } from './useCompactMode';
import { AppClientOrchestratorInstance } from '../../../apps/orchestrator';

type AppDetailsPageFormData = Record<string, SettingValue>;

export type AppDetailsPageProps = {
	id: App['id'];
};

const AppDetailsPage = ({ id }: AppDetailsPageProps) => {
    /* Implementation Hidden */
};

export default AppDetailsPage;

```