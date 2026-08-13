## File: apps/meteor/client/views/admin/engagementDashboard/EngagementDashboardPage.tsx

```typescript
import { Box, Select, Tabs, TabsItem } from '@rocket.chat/fuselage';
import { PageScrollableContent, Page, PageHeader } from '@rocket.chat/ui-client';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChannelsTab from './channels/ChannelsTab';
import MessagesTab from './messages/MessagesTab';
import UsersTab from './users/UsersTab';

export type EngagementDashboardPageProps = {
	tab: 'users' | 'messages' | 'channels';
	onSelectTab?: (tab: 'users' | 'messages' | 'channels') => void;
};

const EngagementDashboardPage = ({ tab = 'users', onSelectTab }: EngagementDashboardPageProps) => {
    /* Implementation Hidden */
};

export default EngagementDashboardPage;

```