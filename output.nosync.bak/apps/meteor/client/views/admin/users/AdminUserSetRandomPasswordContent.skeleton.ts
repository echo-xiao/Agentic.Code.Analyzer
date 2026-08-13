## File: apps/meteor/client/views/admin/users/AdminUserSetRandomPasswordContent.tsx

```typescript
import { Box, FieldError, FieldLabel, FieldRow, PasswordInput, ToggleSwitch } from '@rocket.chat/fuselage';
import { PasswordVerifier, useValidatePassword } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { UserFormProps } from './AdminUserForm';

export type AdminUserSetRandomPasswordContentProps = {
	control: Control<UserFormProps, any>;
	setRandomPassword: boolean | undefined;
	isNewUserPage: boolean;
	passwordId: string;
	errors: FieldErrors<UserFormProps>;
	password: string;
};

const AdminUserSetRandomPasswordContent = ({
	control,
	setRandomPassword,
	isNewUserPage,
	passwordId,
	errors,
	password,
}: AdminUserSetRandomPasswordContentProps) => {
    /* Implementation Hidden */
};

export default AdminUserSetRandomPasswordContent;

```