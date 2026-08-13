## File: apps/meteor/client/views/admin/settings/Setting/inputs/GenericSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, TextInput } from '@rocket.chat/fuselage';
import type { ChangeEventHandler } from 'react';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type GenericSettingInputProps = SettingInputProps & {
	value: string;
};

function GenericSettingInput({
	_id,
	label,
	value,
	hint,
	placeholder,
	readonly,
	autocomplete,
	disabled,
	required,
	hasResetButton,
	onChangeValue,
	onResetButtonClick,
}: GenericSettingInputProps) {
    /* Implementation Hidden */
}

export default GenericSettingInput;

```