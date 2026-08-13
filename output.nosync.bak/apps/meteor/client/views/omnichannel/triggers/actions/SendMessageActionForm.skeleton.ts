## File: apps/meteor/client/views/omnichannel/triggers/actions/SendMessageActionForm.tsx

```typescript
import { Field, FieldError, FieldLabel, FieldRow, TextAreaInput } from '@rocket.chat/fuselage';
import { useId, type ComponentProps } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { TriggersPayload } from '../EditTrigger';
import { useFieldError } from '../hooks';
import { ActionSender } from './ActionSender';

type SendMessageActionFormType = ComponentProps<typeof Field> & {
	index: number;
	control: Control<TriggersPayload>;
};

export const SendMessageActionForm = ({ control, index, ...props }: SendMessageActionFormType) => {
    /* Implementation Hidden */
};

```