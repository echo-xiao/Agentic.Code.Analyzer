## File: apps/meteor/client/views/marketplace/MarketplaceSidebar.tsx

```typescript
import { useTranslation, useLayout, useCurrentRoutePath } from '@rocket.chat/ui-contexts';
import { memo, useSyncExternalStore } from 'react';

import { getMarketplaceSidebarItems, subscribeToMarketplaceSidebarItems } from './sidebarItems';
import Sidebar from '../../components/Sidebar';
import SidebarItemsAssembler from '../../components/Sidebar/SidebarItemsAssembler';
import SettingsProvider from '../../providers/SettingsProvider';

const MarketplaceSidebar = () => {
    /* Implementation Hidden */
};

export default memo(MarketplaceSidebar);

```