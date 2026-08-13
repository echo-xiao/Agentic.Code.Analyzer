## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RepliesForm/components/DepartmentField.tsx

```typescript
import { Field, FieldError, FieldHint, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { useId } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AutoCompleteDepartment from '../../../../../../AutoCompleteDepartment';
import RetryButton from '../../../components/RetryButton';
import { cxp } from '../../../utils/cx';
import type { RepliesFormData } from '../RepliesForm';

type DepartmentFieldProps = ComponentProps<typeof Field> & {
	control: Control<RepliesFormData>;
	onlyMyDepartments?: boolean;
	isError: boolean;
	isFetching: boolean;
	onRefetch: () => void;
	onChange: () => void;
};

const DepartmentField = ({
	control,
	onlyMyDepartments,
	isError,
	isFetching,
	onRefetch,
	onChange: onChangeExternal,
	...props
}: DepartmentFieldProps) => {
    /* Implementation Hidden */
};

export default DepartmentField;

```