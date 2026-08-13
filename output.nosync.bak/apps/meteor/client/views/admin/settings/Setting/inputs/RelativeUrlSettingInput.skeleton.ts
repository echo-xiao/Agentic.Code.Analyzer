## File: apps/meteor/client/views/admin/settings/Setting/inputs/RelativeUrlSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, UrlInput } from '@rocket.chat/fuselage';
import { useAbsoluteUrl } from '@rocket.chat/ui-contexts';
import type { ChangeEventHandler } from 'react';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type RelativeUrlSettingInputProps = SettingInputProps;

function RelativeUrlSettingInput({
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
}: RelativeUrlSettingInputProps) {
    /* Implementation Hidden */
}

export default RelativeUrlSettingInput;

```