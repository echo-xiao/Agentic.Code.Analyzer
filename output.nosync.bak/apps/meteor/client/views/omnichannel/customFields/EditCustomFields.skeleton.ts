## File: apps/meteor/client/views/omnichannel/customFields/EditCustomFields.tsx

```typescript
import type { ILivechatCustomField, Serialized } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import {
	FieldError,
	Button,
	ButtonGroup,
	Field,
	FieldGroup,
	FieldLabel,
	FieldRow,
	Select,
	TextInput,
	ToggleSwitch,
	Box,
} from '@rocket.chat/fuselage';
import {
	ContextualbarTitle,
	ContextualbarHeader,
	ContextualbarClose,
	ContextualbarFooter,
	ContextualbarScrollableContent,
} from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useId, useMemo } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';

import { CustomFieldsAdditionalForm } from '../additionalForms';
import { useRemoveCustomField } from './useRemoveCustomField';
import { useFormSubmitWithDirtyCheck } from '../../../hooks/useFormSubmitWithDirtyCheck';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';

export type EditCustomFieldsFormData = {
	field: string;
	label: string;
	scope: 'visitor' | 'room';
	visibility: boolean;
	searchable: boolean;
	regexp: string;
	type: string;
	required: boolean;
	defaultValue: string;
	options: string;
	public: boolean;
};

const getInitialValues = (customFieldData: Serialized<ILivechatCustomField> | undefined) => ({
	field: customFieldData?._id || '',
	label: customFieldData?.label || '',
	scope: customFieldData?.scope || 'visitor',
	visibility: customFieldData?.visibility === 'visible',
	searchable: !!customFieldData?.searchable,
	regexp: customFieldData?.regexp || '',
	// additional props
	type: customFieldData?.type || 'input',
	required: !!customFieldData?.required,
	defaultValue: customFieldData?.defaultValue || '',
	options: customFieldData?.options || '',
	public: !!customFieldData?.public,
});

const EditCustomFields = ({ customFieldData, onClose }: { customFieldData?: Serialized<ILivechatCustomField>; onClose: () => void }) => {
    /* Implementation Hidden */
};

export default EditCustomFields;

```