## File: apps/meteor/client/views/admin/engagementDashboard/messages/MessagesPerChannelSection.tsx

```typescript
import { ResponsivePie } from '@nivo/pie';
import {
	Box,
	FlexContainer,
	FlexItem,
	Icon,
	Margins,
	Skeleton,
	Table,
	Tile,
	Palette,
	Tooltip,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from '@rocket.chat/fuselage';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useMessageOrigins } from './useMessageOrigins';
import { useTopFivePopularChannels } from './useTopFivePopularChannels';
import DownloadDataButton from '../../../../components/dashboards/DownloadDataButton';
import PeriodSelector from '../../../../components/dashboards/PeriodSelector';
import { usePeriodSelectorState } from '../../../../components/dashboards/usePeriodSelectorState';
import EngagementDashboardCardFilter from '../EngagementDashboardCardFilter';
import LegendSymbol from '../dataView/LegendSymbol';

const colors = {
	warning: Palette.statusColor['status-font-on-warning'].toString(),
	success: Palette.statusColor['status-font-on-success'].toString(),
	info: Palette.statusColor['status-font-on-info'].toString(),
};
const MessagesPerChannelSection = () => {
    /* Implementation Hidden */
};

export default MessagesPerChannelSection;

```