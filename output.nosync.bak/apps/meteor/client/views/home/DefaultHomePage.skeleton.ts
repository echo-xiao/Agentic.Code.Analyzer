## File: apps/meteor/client/views/home/DefaultHomePage.tsx

```typescript
import { Box, CardGroup } from '@rocket.chat/fuselage';
import { PageScrollableContent, Page } from '@rocket.chat/ui-client';
import { useAtLeastOnePermission, useSetting, useTranslation, useRole, usePermission } from '@rocket.chat/ui-contexts';

import HomePageHeader from './HomePageHeader';
import AddUsersCard from './cards/AddUsersCard';
import CreateChannelsCard from './cards/CreateChannelsCard';
import CustomContentCard from './cards/CustomContentCard';
import DesktopAppsCard from './cards/DesktopAppsCard';
import DocumentationCard from './cards/DocumentationCard';
import JoinRoomsCard from './cards/JoinRoomsCard';
import MobileAppsCard from './cards/MobileAppsCard';

const CREATE_CHANNEL_PERMISSIONS = ['create-c', 'create-p'];

const DefaultHomePage = () => {
    /* Implementation Hidden */
};

export default DefaultHomePage;

```