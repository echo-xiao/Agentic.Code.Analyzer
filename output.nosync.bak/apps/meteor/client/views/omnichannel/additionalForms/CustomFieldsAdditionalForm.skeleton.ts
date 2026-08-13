## File: apps/meteor/client/views/omnichannel/additionalForms/CustomFieldsAdditionalForm.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Field, FieldLabel, FieldRow, FieldError, FieldHint, ToggleSwitch, TextInput, Select } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useId, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import type { EditCustomFieldsFormData } from '../customFields/EditCustomFields';

const checkIsOptionsValid = (value: string) => {
    /* Implementation Hidden */
};

export type CustomFieldsAdditionalFormProps = { className?: ComponentProps<typeof Field>['className'] };

const CustomFieldsAdditionalForm = ({ className }: CustomFieldsAdditionalFormProps) => {
    /* Implementation Hidden */
};

export default CustomFieldsAdditionalForm;

```