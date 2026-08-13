## File: apps/meteor/client/views/admin/users/AdminUserSetRandomPasswordRadios.tsx

```typescript
import { Box, FieldHint, FieldLabel, FieldRow, RadioButton } from '@rocket.chat/fuselage';
import { useId } from 'react';
import type { Control, UseFormSetValue } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import type { UserFormProps } from './AdminUserForm';

type AdminUserSetRandomPasswordProps = {
	isNewUserPage: boolean | undefined;
	control: Control<UserFormProps, any>;
	isSmtpEnabled: boolean | undefined;
	setRandomPasswordId: string;
	setValue: UseFormSetValue<UserFormProps>;
};

const AdminUserSetRandomPasswordRadios = ({
	isNewUserPage,
	control,
	isSmtpEnabled,
	setRandomPasswordId,
	setValue,
}: AdminUserSetRandomPasswordProps) => {
    /* Implementation Hidden */
};

export default AdminUserSetRandomPasswordRadios;

```