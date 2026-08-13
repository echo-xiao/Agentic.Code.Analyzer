## File: apps/meteor/client/views/account/security/ChangePassword.tsx

```typescript
import { Box, Field, FieldError, FieldGroup, FieldHint, FieldLabel, FieldRow, PasswordInput } from '@rocket.chat/fuselage';
import { PasswordVerifier, useValidatePassword } from '@rocket.chat/ui-client';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { AllHTMLAttributes } from 'react';
import { useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAllowPasswordChange } from './useAllowPasswordChange';

type PasswordFieldValues = { password: string; confirmationPassword: string };

function getAriaDescribedbyForPassword(
	passwordVerifierId: string,
	passwordId: string,
	allowPasswordChange: boolean,
	passwordError: boolean,
) {
    /* Implementation Hidden */
}

const ChangePassword = (props: AllHTMLAttributes<HTMLFormElement>) => {
    /* Implementation Hidden */
};

export default ChangePassword;

```