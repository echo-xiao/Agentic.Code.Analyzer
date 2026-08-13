## File: apps/meteor/client/views/omnichannel/additionalForms/BusinessHoursMultiple.tsx

```typescript
import { Field, FieldLabel, FieldRow, FieldError, TextInput, ToggleSwitch } from '@rocket.chat/fuselage';
import { useId } from 'react';
import type { ComponentProps } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import type { BusinessHoursFormData } from '../businessHours/BusinessHoursForm';
import AutoCompleteDepartmentMultiple from '../components/AutoCompleteDepartmentMultiple';

export type BusinessHoursMultipleProps = { className?: ComponentProps<typeof Field>['className'] };

const BusinessHoursMultiple = ({ className }: BusinessHoursMultipleProps) => {
    /* Implementation Hidden */
};

export default BusinessHoursMultiple;

```