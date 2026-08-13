## File: packages/web-ui-registration/src/SecretRegisterForm.tsx

```typescript
import { useRouteParameter } from '@rocket.chat/ui-contexts';

import RegisterForm from './RegisterForm';
import SecretRegisterInvalidForm from './SecretRegisterInvalidForm';
import { useCheckRegistrationSecret } from './hooks/useCheckRegistrationSecret';
import type { DispatchLoginRouter } from './hooks/useLoginRouter';
import FormSkeleton from './template/FormSkeleton';
import HorizontalTemplate from './template/HorizontalTemplate';

const SecretRegisterForm = ({ setLoginRoute }: { setLoginRoute: DispatchLoginRouter }) => {
    /* Implementation Hidden */
};

export default SecretRegisterForm;

```