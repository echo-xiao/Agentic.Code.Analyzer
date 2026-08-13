## File: apps/meteor/client/views/admin/settings/Setting/inputs/SelectTimezoneSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, Select } from '@rocket.chat/fuselage';
import { canonicalizeTimezone } from '@rocket.chat/tools';

import { useTimezoneNameList } from '../../../../../hooks/useTimezoneNameList';
import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type SelectTimezoneSettingInputProps = SettingInputProps;

function SelectTimezoneSettingInput({
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
}: SelectTimezoneSettingInputProps) {
    /* Implementation Hidden */
}

export default SelectTimezoneSettingInput;

```