## File: apps/meteor/client/views/root/MainLayout/PasswordChangeCheck.tsx

```typescript
import { useUser } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { lazy } from 'react';

import TwoFactorAuthSetupCheck from './TwoFactorAuthSetupCheck';

const ResetPasswordPage = lazy(() =>
	import('@rocket.chat/web-ui-registration').then(({ ResetPasswordPage }) => ({ default: ResetPasswordPage })),
);

const PasswordChangeCheck = ({ children }: { children: ReactNode }) => {
    /* Implementation Hidden */
};

export default PasswordChangeCheck;

```