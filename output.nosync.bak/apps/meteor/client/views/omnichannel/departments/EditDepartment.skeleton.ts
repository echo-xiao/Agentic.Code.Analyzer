## File: apps/meteor/client/views/omnichannel/departments/EditDepartment.tsx

```typescript
import type { ILivechatDepartment, ILivechatDepartmentAgents, Serialized } from '@rocket.chat/core-typings';
import {
	FieldGroup,
	Field,
	FieldLabel,
	FieldRow,
	FieldError,
	TextInput,
	Box,
	Icon,
	Divider,
	ToggleSwitch,
	TextAreaInput,
	ButtonGroup,
	Button,
	PaginatedSelectFiltered,
	FieldHint,
	Option,
} from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { validateEmail } from '@rocket.chat/tools';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint, useRouter, usePermission } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import DepartmentsAgentsTable from './DepartmentAgentsTable/DepartmentAgentsTable';
import DepartmentTags from './DepartmentTags';
import type { EditDepartmentFormData } from './definitions';
import { formatAgentListPayload } from './utils/formatAgentListPayload';
import { formatEditDepartmentPayload } from './utils/formatEditDepartmentPayload';
import { getFormInitialValues } from './utils/getFormInititalValues';
import { useFormSubmitWithDirtyCheck } from '../../../hooks/useFormSubmitWithDirtyCheck';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import { useRoomsList } from '../../../hooks/useRoomsList';
import { EeTextInput, EeTextAreaInput, EeNumberInput, DepartmentBusinessHours } from '../additionalForms';
import AutoCompleteUnit from '../additionalForms/AutoCompleteUnit';
import AutoCompleteDepartment from '../components/AutoCompleteDepartment';
import AutoCompleteDepartmentMultiple from '../components/AutoCompleteDepartmentMultiple';

export type EditDepartmentProps = {
	id?: string;
	title: string;
	data?: Serialized<{
		department: ILivechatDepartment | null;
		agents?: ILivechatDepartmentAgents[];
	}>;
	allowedToForwardData?: Serialized<{
		departments: ILivechatDepartment[];
	}>;
};

function EditDepartment({ data, id, title, allowedToForwardData }: EditDepartmentProps) {
    /* Implementation Hidden */
}

export default EditDepartment;

```