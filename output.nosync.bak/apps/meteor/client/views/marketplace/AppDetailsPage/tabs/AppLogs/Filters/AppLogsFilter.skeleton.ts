## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/AppLogsFilter.tsx

```typescript
import { Box, Button, IconButton, Label } from '@rocket.chat/fuselage';
import { useRouter, useSetModal } from '@rocket.chat/ui-contexts';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AppsLogsFilterOptions from './AppLogsFilterOptions';
import CompactFilterOptions from './CompactFilterOptions';
import { EventFilterSelect } from './EventFilterSelect';
import { InstanceFilterSelect } from './InstanceFilterSelect';
import { SeverityFilterSelect } from './SeverityFilterSelect';
import { TimeFilterSelect } from './TimeFilterSelect';
import { useCompactMode } from '../../../useCompactMode';
import { useAppLogsFilterFormContext } from '../useAppLogsFilterForm';
import { ExportLogsModal } from './ExportLogsModal';

type AppsLogsFilterProps = {
	appId: string;
	expandAll: () => void;
	collapseAll: () => void;
	refetchLogs: () => void;
	isLoading: boolean;
	noResults?: boolean;
};

export const AppLogsFilter = ({ appId, expandAll, collapseAll, refetchLogs, isLoading, noResults = false }: AppsLogsFilterProps) => {
    /* Implementation Hidden */
};

```