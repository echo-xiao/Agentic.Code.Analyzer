## File: apps/meteor/client/views/root/MainLayout/LoggedInArea.tsx

```typescript
import { useUser } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';

import { useCustomEmoji } from '../hooks/loggedIn/useCustomEmoji';
import { useE2EEncryption } from '../hooks/loggedIn/useE2EEncryption';
import { useFingerprintChange } from '../hooks/loggedIn/useFingerprintChange';
import { useFontStylePreference } from '../hooks/loggedIn/useFontStylePreference';
import { useForceLogout } from '../hooks/loggedIn/useForceLogout';
import { useLogoutCleanup } from '../hooks/loggedIn/useLogoutCleanup';
import { useNotificationUserCalendar } from '../hooks/loggedIn/useNotificationUserCalendar';
import { useNotifyUser } from '../hooks/loggedIn/useNotifyUser';
import { useRestrictedRoles } from '../hooks/loggedIn/useRestrictedRoles';
import { useRootUrlChange } from '../hooks/loggedIn/useRootUrlChange';
import { useStoreCookiesOnLogin } from '../hooks/loggedIn/useStoreCookiesOnLogin';
import { useTwoFactorAuthSetupCheck } from '../hooks/loggedIn/useTwoFactorAuthSetupCheck';
import { useUnread } from '../hooks/loggedIn/useUnread';
import { useUpdateVideoConfUser } from '../hooks/loggedIn/useUpdateVideoConfUser';

const LoggedInArea = ({ children }: { children: ReactNode }) => {
    /* Implementation Hidden */
};

export default LoggedInArea;

```