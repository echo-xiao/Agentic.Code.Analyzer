## File: apps/meteor/client/views/admin/engagementDashboard/messages/MessagesSentSection.tsx

```typescript
import { ResponsiveBar } from '@nivo/bar';
import { Box, FlexContainer, FlexItem, Skeleton, Palette, Tooltip } from '@rocket.chat/fuselage';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import { differenceInDays, addDays, format } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import DownloadDataButton from '../../../../components/dashboards/DownloadDataButton';
import PeriodSelector from '../../../../components/dashboards/PeriodSelector';
import { usePeriodLabel } from '../../../../components/dashboards/usePeriodLabel';
import { usePeriodSelectorState } from '../../../../components/dashboards/usePeriodSelectorState';
import CounterSet from '../../../../components/dataView/CounterSet';
import EngagementDashboardCardFilter from '../EngagementDashboardCardFilter';
import { useMessagesSent } from './useMessagesSent';
import { useFormatDate } from '../../../../hooks/useFormatDate';

export type MessagesSentSectionProps = {
	timezone: 'utc' | 'local';
};

const MessagesSentSection = ({ timezone }: MessagesSentSectionProps) => {
    /* Implementation Hidden */
};

export default MessagesSentSection;

```