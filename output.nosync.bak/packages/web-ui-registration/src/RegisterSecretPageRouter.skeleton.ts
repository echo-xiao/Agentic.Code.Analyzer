## File: packages/web-ui-registration/src/RegisterSecretPageRouter.tsx

```typescript
import { useDocumentTitle } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import RegisterForm from './RegisterForm';
import RegisterFormDisabled from './RegisterFormDisabled';
import RegisterTemplate from './RegisterTemplate';
import SecretRegisterForm from './SecretRegisterForm';
import SecretRegisterInvalidForm from './SecretRegisterInvalidForm';
import type { DispatchLoginRouter } from './hooks/useLoginRouter';
import FormSkeleton from './template/FormSkeleton';

export const RegisterSecretPageRouter = ({
	setLoginRoute,
	origin,
}: {
	setLoginRoute: DispatchLoginRouter;
	origin: 'register' | 'secret-register' | 'invite-register';
}) => {
    /* Implementation Hidden */
};

export default RegisterSecretPageRouter;

```