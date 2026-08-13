## File: apps/meteor/client/views/admin/engagementDashboard/users/BusiestChatTimesSection.tsx

```typescript
import { Select } from '@rocket.chat/fuselage';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import EngagementDashboardCardFilter from '../EngagementDashboardCardFilter';
import ContentForDays from './ContentForDays';
import ContentForHours from './ContentForHours';

type TimeUnit = 'hours' | 'days';

export type BusiestChatTimesSectionProps = {
	timezone: 'utc' | 'local';
};

const BusiestChatTimesSection = ({ timezone }: BusiestChatTimesSectionProps) => {
    /* Implementation Hidden */
};

export default BusiestChatTimesSection;

```