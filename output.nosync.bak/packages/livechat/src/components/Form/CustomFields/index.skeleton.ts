## File: packages/livechat/src/components/Form/CustomFields/index.tsx

```typescript
import type { Control, FieldErrors, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { RegisterFormValues } from '../../../routes/Register';
import { FormField } from '../FormField';
import { SelectInput } from '../SelectInput';
import { TextInput } from '../TextInput';

export type CustomField = {
	_id: string;
	required?: boolean;
	label?: string;
	type: 'input' | 'select';
	options?: string[];
	defaultValue?: string;
	regexp?: RegExp;
};

type RenderCustomFieldsProps = {
	customFields: CustomField[];
	loading: boolean;
	control: Control<RegisterFormValues>;
	errors: FieldErrors<FieldValues>;
};

export const CustomFields = ({ customFields, loading, control, errors }: RenderCustomFieldsProps) => {
    /* Implementation Hidden */
};

```