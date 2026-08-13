## File: apps/meteor/client/views/omnichannel/sidebar/OmnichannelSidebar.tsx

```typescript
import { useTranslation, useLayout, useCurrentRoutePath } from '@rocket.chat/ui-contexts';
import { memo, useSyncExternalStore } from 'react';

import Sidebar from '../../../components/Sidebar';
import SidebarItemsAssemblerProps from '../../../components/Sidebar/SidebarItemsAssembler';
import SettingsProvider from '../../../providers/SettingsProvider';
import { getOmnichannelSidebarItems, subscribeToOmnichannelSidebarItems } from '../sidebarItems';

const OmnichannelSidebar = () => {
    /* Implementation Hidden */
};

export default memo(OmnichannelSidebar);

```