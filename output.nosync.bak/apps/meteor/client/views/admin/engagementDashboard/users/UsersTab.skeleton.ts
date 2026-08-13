## File: apps/meteor/client/views/admin/engagementDashboard/users/UsersTab.tsx

```typescript
import { Box, FlexItem } from '@rocket.chat/fuselage';
import { useBreakpoints } from '@rocket.chat/fuselage-hooks';
import { useTranslation } from 'react-i18next';

import EngagementDashboardCard from '../EngagementDashboardCard';
import ActiveUsersSection from './ActiveUsersSection';
import BusiestChatTimesSection from './BusiestChatTimesSection';
import NewUsersSection from './NewUsersSection';
import UsersByTimeOfTheDaySection from './UsersByTimeOfTheDaySection';

export type UsersTabProps = {
	timezone: 'utc' | 'local';
};

const UsersTab = ({ timezone }: UsersTabProps) => {
    /* Implementation Hidden */
};

export default UsersTab;

```