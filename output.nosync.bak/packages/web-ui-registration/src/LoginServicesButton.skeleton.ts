## File: packages/web-ui-registration/src/LoginServicesButton.tsx

```typescript
import { Button } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import type { LoginService } from '@rocket.chat/ui-contexts';
import { useLoginWithService } from '@rocket.chat/ui-contexts';
import type { SetStateAction, Dispatch } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { LoginErrorState, LoginErrors } from './LoginForm';

const LoginServicesButton = <T extends LoginService>({
	buttonLabelText,
	icon,
	title,
	service,
	className,
	disabled,
	setError,
	buttonColor,
	buttonLabelColor,
	...props
}: T & {
	className?: string;
	disabled?: boolean;
	setError?: Dispatch<SetStateAction<LoginErrorState>>;
}) => {
    /* Implementation Hidden */
};

export default LoginServicesButton;

```