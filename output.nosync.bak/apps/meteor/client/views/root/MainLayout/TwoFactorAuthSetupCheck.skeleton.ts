## File: apps/meteor/client/views/root/MainLayout/TwoFactorAuthSetupCheck.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useLayout } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { lazy } from 'react';

import LayoutWithSidebar from './LayoutWithSidebar';
import MainContent from './MainContent';
import { useRequire2faSetup } from '../../hooks/useRequire2faSetup';

const AccountSecurityPage = lazy(() => import('../../account/security/AccountSecurityPage'));

const TwoFactorAuthSetupCheck = ({ children }: { children: ReactNode }) => {
    /* Implementation Hidden */
};

export default TwoFactorAuthSetupCheck;

```