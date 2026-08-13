## File: packages/ui-client/src/components/CustomFieldsForm.tsx

```typescript
import type { CustomFieldMetadata } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Field, FieldLabel, FieldRow, FieldError, Select, TextInput, FieldGroup } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useCallback, useId, useMemo } from 'react';
import type { Control, FieldValues, FieldError as RHFFieldError } from 'react-hook-form';
import { Controller, useFormState, get } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type CustomFieldFormProps<T extends FieldValues> = {
	metadata: CustomFieldMetadata[];
	formControl: Control<T>;
	formName: string;
};

type CustomFieldProps<T extends FieldValues> = Omit<CustomFieldMetadata, 'name'> & {
	control: Control<T>;
	name: string;
};

const FIELD_TYPES = {
	select: Select,
	text: TextInput,
} as const;

const CustomField = <T extends FieldValues>({
	name,
	type,
	control,
	label,
	required,
	defaultValue,
	options = [],
	...props
}: CustomFieldProps<T>) => {
    /* Implementation Hidden */
};

// eslint-disable-next-line react/no-multi-comp
export const CustomFieldsForm = <T extends FieldValues>({ formName, formControl, metadata }: CustomFieldFormProps<T>) => {
    /* Implementation Hidden */
};

```