## File: apps/meteor/client/views/omnichannel/directory/OmnichannelDirectoryPage.tsx

```typescript
import { Box, Callout, Tabs, TabsItem } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { useRouteParameter } from '@rocket.chat/ui-contexts';
import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ContextualBarRouter from './ContextualBarRouter';
import ChatsTab from './chats/ChatsTab';
import ContactTab from './contacts/ContactTab';
import { useOmnichannelDirectoryRouter } from './hooks/useOmnichannelDirectoryRouter';
import ChatsProvider from './providers/ChatsProvider';
import { useIsOverMacLimit } from '../hooks/useIsOverMacLimit';

const OmnichannelDirectoryPage = () => {
    /* Implementation Hidden */
};

export default OmnichannelDirectoryPage;

```