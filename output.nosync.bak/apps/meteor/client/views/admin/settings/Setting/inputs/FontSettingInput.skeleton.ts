## File: apps/meteor/client/views/admin/settings/Setting/inputs/FontSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, TextInput } from '@rocket.chat/fuselage';
import type { ChangeEventHandler } from 'react';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type FontSettingInputProps = SettingInputProps & {
	value: string;
};

function FontSettingInput({
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
}: FontSettingInputProps) {
    /* Implementation Hidden */
}

export default FontSettingInput;

```