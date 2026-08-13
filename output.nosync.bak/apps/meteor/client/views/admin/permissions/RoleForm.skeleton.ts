## File: apps/meteor/client/views/admin/permissions/RoleForm.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Field, FieldLabel, FieldRow, FieldError, FieldHint, TextInput, Select, ToggleSwitch } from '@rocket.chat/fuselage';
import { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { EditRolePageFormData } from './EditRolePage';

export type RoleFormProps = {
	className?: string;
	editing?: boolean;
	isProtected?: boolean;
	isDisabled?: boolean;
};

const RoleForm = ({ className, editing = false, isProtected = false, isDisabled = false }: RoleFormProps) => {
    /* Implementation Hidden */
};

export default RoleForm;

```