## File: apps/meteor/client/views/admin/settings/Setting/inputs/LanguageSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, Select } from '@rocket.chat/fuselage';
import { useLanguages } from '@rocket.chat/ui-contexts';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type LanguageSettingInputProps = SettingInputProps<string, string | number>;

function LanguageSettingInput({
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
}: LanguageSettingInputProps) {
    /* Implementation Hidden */
}

export default LanguageSettingInput;

```