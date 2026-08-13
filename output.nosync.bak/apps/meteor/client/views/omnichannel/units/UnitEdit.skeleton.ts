## File: apps/meteor/client/views/omnichannel/units/UnitEdit.tsx

```typescript
import type {
	ILivechatDepartment,
	ILivechatUnitMonitor,
	Serialized,
	IOmnichannelBusinessUnit,
	OmnichannelBusinessUnitPayload,
} from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { FieldError, Field, TextInput, Button, Select, ButtonGroup, FieldGroup, Box, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import {
	ContextualbarScrollableContent,
	ContextualbarFooter,
	ContextualbarTitle,
	ContextualbarHeader,
	ContextualbarClose,
} from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useId, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useFormSubmitWithDirtyCheck } from '../../../hooks/useFormSubmitWithDirtyCheck';
import AutoCompleteDepartmentMultiple from '../components/AutoCompleteDepartmentMultiple';
import AutoCompleteMonitors from '../components/AutoCompleteMonitors';

type UnitEditFormData = {
	name: string;
	visibility: string;
	departments: {
		value: string;
		label: string;
	}[];
	monitors: {
		value: string;
		label: string;
	}[];
};

type UnitEditProps = {
	unitData?: Serialized<IOmnichannelBusinessUnit>;
	unitMonitors?: Serialized<ILivechatUnitMonitor>[];
	unitDepartments?: Serialized<ILivechatDepartment>[];
	onUpdate?: (params: OmnichannelBusinessUnitPayload) => void;
	onDelete?: () => void;
	onClose: () => void;
};

const UnitEdit = ({ unitData, unitMonitors, unitDepartments, onUpdate, onDelete, onClose }: UnitEditProps) => {
    /* Implementation Hidden */
};

export default UnitEdit;

```