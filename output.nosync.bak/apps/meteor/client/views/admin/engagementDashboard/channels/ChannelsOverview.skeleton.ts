## File: apps/meteor/client/views/admin/engagementDashboard/channels/ChannelsOverview.tsx

```typescript
import { Icon, Margins, Pagination, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Tile } from '@rocket.chat/fuselage';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useChannelsList } from './useChannelsList';
import DownloadDataButton from '../../../../components/dashboards/DownloadDataButton';
import PeriodSelector from '../../../../components/dashboards/PeriodSelector';
import { usePeriodSelectorState } from '../../../../components/dashboards/usePeriodSelectorState';
import Growth from '../../../../components/dataView/Growth';
import EngagementDashboardCardFilter from '../EngagementDashboardCardFilter';

const ChannelsOverview = () => {
    /* Implementation Hidden */
};

export default ChannelsOverview;

```