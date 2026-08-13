## File: apps/meteor/client/views/admin/engagementDashboard/users/ContentForHours.tsx

```typescript
import { ResponsiveBar } from '@nivo/bar';
import { Box, Button, Chevron, Skeleton, Tooltip } from '@rocket.chat/fuselage';
import { useBreakpoints } from '@rocket.chat/fuselage-hooks';
import colors from '@rocket.chat/fuselage-tokens/colors.json';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useHourlyChatActivity } from './useHourlyChatActivity';

export type ContentForHoursProps = {
	displacement: number;
	onPreviousDateClick: () => void;
	onNextDateClick: () => void;
	timezone: 'utc' | 'local';
};

const ContentForHours = ({ displacement, onPreviousDateClick, onNextDateClick, timezone }: ContentForHoursProps) => {
    /* Implementation Hidden */
};

export default ContentForHours;

```