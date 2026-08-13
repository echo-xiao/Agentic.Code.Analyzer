## File: apps/meteor/client/views/admin/moderation/ModerationConsoleRoute.tsx

```typescript
import { usePermission, useRouteParameter, useRouter } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import ModerationConsolePage from './ModerationConsolePage';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const MODERATION_VALID_TABS = ['users', 'messages'] as const;

const isValidTab = (tab: string | undefined): tab is (typeof MODERATION_VALID_TABS)[number] => MODERATION_VALID_TABS.includes(tab as any);

const ModerationRoute = () => {
    /* Implementation Hidden */
};

export default ModerationRoute;

```