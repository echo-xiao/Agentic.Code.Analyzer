## File: apps/meteor/client/views/admin/engagementDashboard/users/NewUsersSection.tsx

```typescript
import { ResponsiveBar } from '@nivo/bar';
import { Box, FlexContainer, FlexItem, Skeleton, Tooltip } from '@rocket.chat/fuselage';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import { differenceInDays, addDays, format } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import DownloadDataButton from '../../../../components/dashboards/DownloadDataButton';
import PeriodSelector from '../../../../components/dashboards/PeriodSelector';
import { usePeriodLabel } from '../../../../components/dashboards/usePeriodLabel';
import { usePeriodSelectorState } from '../../../../components/dashboards/usePeriodSelectorState';
import CounterSet from '../../../../components/dataView/CounterSet';
import { useFormatDate } from '../../../../hooks/useFormatDate';
import EngagementDashboardCardFilter from '../EngagementDashboardCardFilter';
import { useNewUsers } from './useNewUsers';

export type NewUsersSectionProps = {
	timezone: 'utc' | 'local';
};

const NewUsersSection = ({ timezone }: NewUsersSectionProps) => {
    /* Implementation Hidden */
};

export default NewUsersSection;

```