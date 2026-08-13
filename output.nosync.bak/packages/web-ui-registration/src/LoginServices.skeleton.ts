## File: packages/web-ui-registration/src/LoginServices.tsx

```typescript
import { ButtonGroup, Divider } from '@rocket.chat/fuselage';
import { useLoginServices, useSetting } from '@rocket.chat/ui-contexts';
import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import type { LoginErrorState } from './LoginForm';
import LoginServicesButton from './LoginServicesButton';

const LoginServices = ({ disabled, setError }: { disabled?: boolean; setError: Dispatch<SetStateAction<LoginErrorState>> }) => {
    /* Implementation Hidden */
};
export default LoginServices;

```