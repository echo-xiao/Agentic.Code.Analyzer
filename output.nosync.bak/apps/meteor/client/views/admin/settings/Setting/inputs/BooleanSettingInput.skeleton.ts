## File: apps/meteor/client/views/admin/settings/Setting/inputs/BooleanSettingInput.tsx

```typescript
import { Box, Field, FieldHint, FieldLabel, FieldRow, ToggleSwitch } from '@rocket.chat/fuselage';
import type { ChangeEvent } from 'react';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type BooleanSettingInputProps = SettingInputProps<boolean>;

function BooleanSettingInput({
	_id,
	label,
	disabled,
	readonly,
	required,
	value,
	hint,
	hasResetButton,
	onChangeValue,
	onResetButtonClick,
}: BooleanSettingInputProps) {
    /* Implementation Hidden */
}

export default BooleanSettingInput;

```