## File: apps/meteor/client/views/omnichannel/triggers/EditTrigger.tsx

```typescript
import type { ILivechatTrigger, ILivechatTriggerAction, Serialized } from '@rocket.chat/core-typings';
import { FieldGroup, Button, ButtonGroup, Field, FieldLabel, FieldRow, FieldError, TextInput, ToggleSwitch } from '@rocket.chat/fuselage';
import {
	ContextualbarScrollableContent,
	ContextualbarTitle,
	ContextualbarFooter,
	ContextualbarHeader,
	ContextualbarClose,
} from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ConditionForm } from './ConditionForm';
import { ActionForm } from './actions/ActionForm';
import { useFormSubmitWithDirtyCheck } from '../../../hooks/useFormSubmitWithDirtyCheck';

export type TriggersPayload = {
	name: string;
	description: string;
	enabled: boolean;
	runOnce: boolean;
	conditions: ILivechatTrigger['conditions'];
	actions: ILivechatTrigger['actions'];
};

const DEFAULT_SEND_MESSAGE_ACTION = {
	name: 'send-message',
	params: {
		sender: 'queue',
		name: '',
		msg: '',
	},
} as const;

const DEFAULT_PAGE_URL_CONDITION = { name: 'page-url', value: '' } as const;

export const getDefaultAction = (action: ILivechatTriggerAction): ILivechatTriggerAction => {
    /* Implementation Hidden */
};

const getInitialValues = (triggerData: Serialized<ILivechatTrigger> | undefined): TriggersPayload => ({
	name: triggerData?.name ?? '',
	description: triggerData?.description || '',
	enabled: triggerData?.enabled ?? true,
	runOnce: !!triggerData?.runOnce || false,
	conditions: triggerData?.conditions.map(({ name, value }) => ({ name: name || 'page-url', value: value || '' })) ?? [
		DEFAULT_PAGE_URL_CONDITION,
	],
	actions: triggerData?.actions.map((action) => getDefaultAction(action)) ?? [DEFAULT_SEND_MESSAGE_ACTION],
});

const EditTrigger = ({ triggerData, onClose }: { triggerData?: Serialized<ILivechatTrigger>; onClose: () => void }) => {
    /* Implementation Hidden */
};

export default EditTrigger;

```