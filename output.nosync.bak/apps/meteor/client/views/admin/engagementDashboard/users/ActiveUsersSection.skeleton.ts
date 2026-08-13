## File: apps/meteor/client/views/admin/engagementDashboard/users/ActiveUsersSection.tsx

```typescript
import { ResponsiveLine } from '@nivo/line';
import { Box, FlexContainer, FlexItem, Skeleton, Tile } from '@rocket.chat/fuselage';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import { addDays, startOfDay, differenceInDays, endOfDay, subDays, format } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveUsers } from './useActiveUsers';
import DownloadDataButton from '../../../../components/dashboards/DownloadDataButton';
import CounterSet from '../../../../components/dataView/CounterSet';
import { useFormatDate } from '../../../../hooks/useFormatDate';
import EngagementDashboardCardFilter from '../EngagementDashboardCardFilter';
import LegendSymbol from '../dataView/LegendSymbol';

export type ActiveUsersSectionProps = {
	timezone: 'utc' | 'local';
};

const ActiveUsersSection = ({ timezone }: ActiveUsersSectionProps) => {
    /* Implementation Hidden */
};

export default ActiveUsersSection;

```