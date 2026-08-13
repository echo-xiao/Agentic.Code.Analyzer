## File: apps/meteor/client/views/admin/settings/Setting/inputs/RangeSettingInput.tsx

```typescript
import { Slider, Field, FieldLabel, FieldRow, FieldHint } from '@rocket.chat/fuselage';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type RangeSettingInputProps = SettingInputProps<number> & {
	hint?: string;
	minValue?: number;
	maxValue?: number;
};

function RangeSettingInput({
	_id,
	label,
	hint,
	value,
	minValue = 0,
	maxValue = 100,
	readonly,
	disabled,
	required,
	hasResetButton,
	onChangeValue,
	onResetButtonClick,
}: RangeSettingInputProps) {
    /* Implementation Hidden */
}

export default RangeSettingInput;

```