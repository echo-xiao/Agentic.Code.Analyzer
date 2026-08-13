## File: apps/meteor/client/views/admin/settings/Setting/inputs/ColorSettingInput.tsx

```typescript
import type { SettingEditor } from '@rocket.chat/core-typings';
import { FieldLabel, FieldRow, FieldHint, FlexItem, InputBox, Margins, TextInput, Select, Field } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import type { ChangeEvent, Key } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type ColorSettingInputProps = SettingInputProps & {
	value: string;
	editor: string;
	allowedTypes?: TranslationKey[];
};

function ColorSettingInput({
	_id,
	label,
	value,
	hint,
	editor,
	allowedTypes = [],
	placeholder,
	readonly,
	autocomplete,
	disabled,
	required,
	hasResetButton,
	onChangeValue,
	onChangeEditor,
	onResetButtonClick,
}: ColorSettingInputProps) {
    /* Implementation Hidden */
}

export default ColorSettingInput;

```