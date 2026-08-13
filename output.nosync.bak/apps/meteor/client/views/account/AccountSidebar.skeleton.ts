## File: apps/meteor/client/views/account/AccountSidebar.tsx

```typescript
import { useCurrentRoutePath, useTranslation, useLayout } from '@rocket.chat/ui-contexts';
import { memo, useSyncExternalStore } from 'react';

import { getAccountSidebarItems, subscribeToAccountSidebarItems } from './sidebarItems';
import Sidebar from '../../components/Sidebar';
import SettingsProvider from '../../providers/SettingsProvider';

const AccountSidebar = () => {
    /* Implementation Hidden */
};

export default memo(AccountSidebar);

```