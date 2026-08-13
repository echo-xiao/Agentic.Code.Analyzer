## File: apps/meteor/client/views/admin/engagementDashboard/users/ContentForDays.tsx

```typescript
import { ResponsiveBar } from '@nivo/bar';
import { Box, FlexContainer, FlexItem, IconButton, Margins, Skeleton } from '@rocket.chat/fuselage';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import { format, subDays } from 'date-fns';
import { useMemo } from 'react';

import { useWeeklyChatActivity } from './useWeeklyChatActivity';
import { formatDate } from '../../../../lib/utils/dateFormat';

export type ContentForDaysProps = {
	displacement: number;
	onPreviousDateClick: () => void;
	onNextDateClick: () => void;
	timezone: 'utc' | 'local';
};

const ContentForDays = ({ displacement, onPreviousDateClick, onNextDateClick, timezone }: ContentForDaysProps) => {
    /* Implementation Hidden */
};

export default ContentForDays;

```