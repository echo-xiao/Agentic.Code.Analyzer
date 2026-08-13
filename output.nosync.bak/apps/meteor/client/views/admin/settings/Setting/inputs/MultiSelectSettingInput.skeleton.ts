## File: apps/meteor/client/views/admin/settings/Setting/inputs/MultiSelectSettingInput.tsx

```typescript
import { FieldLabel, MultiSelectFiltered, MultiSelect, Field, FieldRow, FieldHint } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type valuesOption = { key: string; i18nLabel: TranslationKey };
export type MultiSelectSettingInputProps = SettingInputProps<[string, string], string[]> & {
	values: valuesOption[];
};

function MultiSelectSettingInput({
	_id,
	label,
	value,
	hint,
	placeholder,
	readonly,
	disabled,
	required,
	values = [],
	hasResetButton,
	onChangeValue,
	onResetButtonClick,
	autocomplete,
}: MultiSelectSettingInputProps) {
    /* Implementation Hidden */
}

export default MultiSelectSettingInput;

```