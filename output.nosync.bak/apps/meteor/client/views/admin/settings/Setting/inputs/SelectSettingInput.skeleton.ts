## File: apps/meteor/client/views/admin/settings/Setting/inputs/SelectSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, Select } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type SelectSettingInputProps = SettingInputProps & {
	values?: { key: string; i18nLabel: TranslationKey }[];
};

function SelectSettingInput({
	_id,
	label,
	value,
	hint,
	placeholder,
	readonly,
	autocomplete,
	disabled,
	required,
	values = [],
	hasResetButton,
	onChangeValue,
	onResetButtonClick,
}: SelectSettingInputProps) {
    /* Implementation Hidden */
}

export default SelectSettingInput;

```