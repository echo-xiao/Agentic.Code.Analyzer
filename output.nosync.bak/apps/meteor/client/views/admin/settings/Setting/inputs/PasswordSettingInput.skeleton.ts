## File: apps/meteor/client/views/admin/settings/Setting/inputs/PasswordSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, PasswordInput } from '@rocket.chat/fuselage';
import type { ChangeEventHandler } from 'react';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type PasswordSettingInputProps = SettingInputProps<string | number | readonly string[] | undefined>;

function PasswordSettingInput({
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
}: PasswordSettingInputProps) {
    /* Implementation Hidden */
}

export default PasswordSettingInput;

```