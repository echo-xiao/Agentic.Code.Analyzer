## File: apps/meteor/client/views/omnichannel/triggers/actions/ActionExternalServiceUrl.tsx

```typescript
import { Box, Button, Field, FieldError, FieldHint, FieldLabel, FieldRow, Icon, TextInput } from '@rocket.chat/fuselage';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { useId, useState } from 'react';
import type { Control, UseFormTrigger } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { TriggersPayload } from '../EditTrigger';
import { useFieldError } from '../hooks';

type ActionExternaServicelUrlType = ComponentProps<typeof Field> & {
	index: number;
	control: Control<TriggersPayload>;
	trigger: UseFormTrigger<TriggersPayload>;
	disabled?: boolean;
};

export const ActionExternalServiceUrl = ({ control, trigger, index, disabled, ...props }: ActionExternaServicelUrlType) => {
    /* Implementation Hidden */
};

```