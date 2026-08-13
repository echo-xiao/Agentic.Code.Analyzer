## File: apps/meteor/client/views/admin/moderation/ModerationConsolePage.tsx

```typescript
import { Tabs, TabsItem } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { useTranslation, useRouteParameter, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import ModConsoleReportDetails from './ModConsoleReportDetails';
import ModerationConsoleTable from './ModerationConsoleTable';
import ModConsoleUsersTable from './UserReports/ModConsoleUsersTable';
import { getPermaLink } from '../../../lib/getPermaLink';

type TabType = 'users' | 'messages';

export type ModerationConsolePageProps = {
	tab: TabType;
	onSelectTab?: (tab: TabType) => void;
};

const ModerationConsolePage = ({ tab = 'messages', onSelectTab }: ModerationConsolePageProps) => {
    /* Implementation Hidden */
};

export default ModerationConsolePage;

```