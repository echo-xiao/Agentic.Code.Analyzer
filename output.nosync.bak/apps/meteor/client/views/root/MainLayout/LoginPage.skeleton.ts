## File: apps/meteor/client/views/root/MainLayout/LoginPage.tsx

```typescript
import { useSession } from '@rocket.chat/ui-contexts';
import type { LoginRoutes } from '@rocket.chat/web-ui-registration';
import RegistrationRoute from '@rocket.chat/web-ui-registration';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LoggedOutBanner from '../../../components/deviceManagement/LoggedOutBanner';
import { useIframe } from '../hooks/useIframe';

const LoginPage = ({ defaultRoute, children }: { defaultRoute?: LoginRoutes; children?: ReactNode }) => {
    /* Implementation Hidden */
};

export default LoginPage;

```