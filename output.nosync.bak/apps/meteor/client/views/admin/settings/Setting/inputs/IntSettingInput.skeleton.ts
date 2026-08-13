## File: apps/meteor/client/views/admin/settings/Setting/inputs/IntSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, InputBox } from '@rocket.chat/fuselage';
import type { ChangeEventHandler } from 'react';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type IntSettingInputProps = SettingInputProps<string, string | number> & {
	value: string;
};

function IntSettingInput({
	_id,
	label,
	value,
	hint,
	placeholder,
	readonly,
	autocomplete,
	disabled,
	required,
	onChangeValue,
	hasResetButton,
	onResetButtonClick,
}: IntSettingInputProps) {
    /* Implementation Hidden */
}

export default IntSettingInput;

```