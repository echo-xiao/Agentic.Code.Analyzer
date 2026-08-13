## File: apps/meteor/client/views/admin/engagementDashboard/messages/MessagesTab.tsx

```typescript
import { useTranslation } from 'react-i18next';

import EngagementDashboardCard from '../EngagementDashboardCard';
import MessagesPerChannelSection from './MessagesPerChannelSection';
import MessagesSentSection from './MessagesSentSection';

export type MessagesTabProps = {
	timezone: 'utc' | 'local';
};

const MessagesTab = ({ timezone }: MessagesTabProps) => {
    /* Implementation Hidden */
};

export default MessagesTab;

```