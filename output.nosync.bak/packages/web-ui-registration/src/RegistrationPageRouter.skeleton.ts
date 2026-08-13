## File: packages/web-ui-registration/src/RegistrationPageRouter.tsx

```typescript
import { useSession } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import GuestForm from './GuestForm';
import { LoginForm } from './LoginForm';
import RegisterSecretPageRouter from './RegisterSecretPageRouter';
import RegisterTemplate from './RegisterTemplate';
import ResetPasswordForm from './ResetPasswordForm';
import { useLoginRouter } from './hooks/useLoginRouter';
import type { LoginRoutes } from './hooks/useLoginRouter';

export const RegistrationPageRouter = ({ defaultRoute = 'login', children }: { defaultRoute?: LoginRoutes; children?: ReactNode }) => {
    /* Implementation Hidden */
};

export default RegistrationPageRouter;

```