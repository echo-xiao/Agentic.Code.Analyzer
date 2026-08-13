## File: apps/meteor/client/views/omnichannel/triggers/actions/ActionForm.tsx

```typescript
import {
	Box,
	Field,
	FieldGroup,
	FieldHint,
	FieldLabel,
	FieldRow,
	Option,
	SelectLegacy,
	Tag,
	type SelectOption,
} from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useCallback, useId, useMemo } from 'react';
import type { Control, UseFormTrigger } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../../hooks/useHasLicenseModule';
import type { TriggersPayload } from '../EditTrigger';
import { getActionFormFields } from '../utils';

type SendMessageFormType = ComponentProps<typeof Field> & {
	control: Control<TriggersPayload>;
	trigger: UseFormTrigger<TriggersPayload>;
	index: number;
};

const ACTION_HINTS: Record<string, TranslationKey> = {
	'use-external-service': 'External_service_action_hint',
} as const;

const PREMIUM_ACTIONS = ['use-external-service'];

export const ActionForm = ({ control, trigger, index, ...props }: SendMessageFormType) => {
    /* Implementation Hidden */
};

```