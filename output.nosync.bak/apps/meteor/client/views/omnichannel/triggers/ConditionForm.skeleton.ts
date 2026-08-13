## File: apps/meteor/client/views/omnichannel/triggers/ConditionForm.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Field, FieldGroup, FieldLabel, FieldRow, NumberInput, Select, TextInput } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useId, useMemo } from 'react';
import type { Control } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { TriggersPayload } from './EditTrigger';

type ConditionFormType = ComponentProps<typeof Field> & {
	index: number;
	control: Control<TriggersPayload>;
};

export const ConditionForm = ({ control, index, ...props }: ConditionFormType) => {
    /* Implementation Hidden */
};

```