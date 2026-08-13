## File: apps/meteor/client/views/admin/settings/Setting/inputs/StringSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, TextAreaInput, TextInput } from '@rocket.chat/fuselage';
import type { ChangeEventHandler } from 'react';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type StringSettingInputProps = SettingInputProps & {
	name?: string;
	multiline?: boolean;
	error?: string;
};

function StringSettingInput({
	_id,
	label,
	name,
	disabled,
	required,
	multiline,
	placeholder,
	readonly,
	error,
	autocomplete,
	value,
	hint,
	hasResetButton,
	onChangeValue,
	onResetButtonClick,
}: StringSettingInputProps) {
    /* Implementation Hidden */
}

export default StringSettingInput;

```