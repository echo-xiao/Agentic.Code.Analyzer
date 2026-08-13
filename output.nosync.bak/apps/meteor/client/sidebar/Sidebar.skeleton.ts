## File: apps/meteor/client/sidebar/Sidebar.tsx

```typescript
import { SidebarV2 } from '@rocket.chat/fuselage';
import { useUserPreference } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import SidebarRoomList from './RoomList';
import SidebarFooter from './footer';
import BannerSection from './sections/BannerSection';
import NowPlayingSection from './sections/NowPlayingSection';

const Sidebar = () => {
    /* Implementation Hidden */
};

export default memo(Sidebar);

```