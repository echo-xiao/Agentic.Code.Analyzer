## File: apps/meteor/client/views/admin/engagementDashboard/users/UsersByTimeOfTheDaySection.tsx

```typescript
import type { ComputedCell, DefaultHeatMapDatum } from '@nivo/heatmap';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import { Box, FlexItem, Skeleton, Tooltip } from '@rocket.chat/fuselage';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import { differenceInDays, addDays, endOfDay, format, isSameDay } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUsersByTimeOfTheDay } from './useUsersByTimeOfTheDay';
import DownloadDataButton from '../../../../components/dashboards/DownloadDataButton';
import PeriodSelector from '../../../../components/dashboards/PeriodSelector';
import { usePeriodSelectorState } from '../../../../components/dashboards/usePeriodSelectorState';
import EngagementDashboardCardFilter from '../EngagementDashboardCardFilter';

export type UsersByTimeOfTheDaySectionProps = {
	timezone: 'utc' | 'local';
};

function endOfDayUTC(d: Date): Date {
    /* Implementation Hidden */
}

const UsersByTimeOfTheDaySection = ({ timezone }: UsersByTimeOfTheDaySectionProps) => {
    /* Implementation Hidden */
};

export default UsersByTimeOfTheDaySection;

```