## File: apps/meteor/client/views/omnichannel/triggers/actions/ActionSender.tsx

```typescript
import { FieldRow, Select, TextInput, type SelectOption, Field, FieldLabel } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useId, useMemo } from 'react';
import type { Control } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { TriggersPayload } from '../EditTrigger';

type ActionSenderType = ComponentProps<typeof Field> & {
	control: Control<TriggersPayload>;
	index: number;
	disabled?: boolean;
};

export const ActionSender = ({ control, index, disabled, ...props }: ActionSenderType) => {
    /* Implementation Hidden */
};

```