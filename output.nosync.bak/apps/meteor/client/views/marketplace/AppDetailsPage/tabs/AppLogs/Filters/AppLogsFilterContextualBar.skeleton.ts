## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/Filters/AppLogsFilterContextualBar.tsx

```typescript
import { Box, Button, Label } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarScrollableContent,
	ContextualbarDialog,
	ContextualbarFooter,
} from '@rocket.chat/ui-client';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DateTimeFilter from './DateTimeFilter';
import { InstanceFilterSelect } from './InstanceFilterSelect';
import { SeverityFilterSelect } from './SeverityFilterSelect';
import { TimeFilterSelect } from './TimeFilterSelect';
import { useAppLogsFilterFormContext } from '../useAppLogsFilterForm';

export type AppLogsFilterContextualBarProps = {
	appId: string;
	onClose: () => void;
};

export const AppLogsFilterContextualBar = ({ appId, onClose = () => undefined }: AppLogsFilterContextualBarProps) => {
    /* Implementation Hidden */
};

```