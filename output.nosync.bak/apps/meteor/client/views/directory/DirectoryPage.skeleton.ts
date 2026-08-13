## File: apps/meteor/client/views/directory/DirectoryPage.tsx

```typescript
import { Tabs, TabsItem } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { useRouter, useRouteParameter, useSetting } from '@rocket.chat/ui-contexts';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ChannelsTab from './tabs/channels/ChannelsTab';
import TeamsTab from './tabs/teams/TeamsTab';
import UsersTab from './tabs/users/UsersTab';

type TabName = 'users' | 'channels' | 'teams' | 'external';

const DirectoryPage = () => {
    /* Implementation Hidden */
};

export default DirectoryPage;

```