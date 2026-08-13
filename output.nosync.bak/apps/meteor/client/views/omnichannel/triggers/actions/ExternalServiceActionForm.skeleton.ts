## File: apps/meteor/client/views/omnichannel/triggers/actions/ExternalServiceActionForm.tsx

```typescript
import { FieldError, Field, FieldHint, FieldLabel, FieldRow, NumberInput, TextAreaInput, FieldGroup } from '@rocket.chat/fuselage';
import { useId, type ComponentProps, type FocusEvent } from 'react';
import type { Control, UseFormTrigger } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../../hooks/useHasLicenseModule';
import type { TriggersPayload } from '../EditTrigger';
import { useFieldError } from '../hooks';
import { ActionExternalServiceUrl } from './ActionExternalServiceUrl';
import { ActionSender } from './ActionSender';

type SendMessageActionFormType = ComponentProps<typeof Field> & {
	index: number;
	control: Control<TriggersPayload>;
	trigger: UseFormTrigger<TriggersPayload>;
};

export const ExternalServiceActionForm = ({ control, trigger, index, ...props }: SendMessageActionFormType) => {
    /* Implementation Hidden */
};

```