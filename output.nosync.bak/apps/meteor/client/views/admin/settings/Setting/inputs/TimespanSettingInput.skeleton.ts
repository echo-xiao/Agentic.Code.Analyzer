## File: apps/meteor/client/views/admin/settings/Setting/inputs/TimespanSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, InputBox, Select } from '@rocket.chat/fuselage';
import type { ChangeEventHandler, Key } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TIMEUNIT, timeUnitToMs, msToTimeUnit } from '../../../../../lib/convertTimeUnit';
import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type TimespanSettingInputProps = SettingInputProps<string, string | number> & {
	value: string;
};

export const getHighestTimeUnit = (value: number): TIMEUNIT => {
    /* Implementation Hidden */
};

const sanitizeInputValue = (value: number) => {
    /* Implementation Hidden */
};

function TimespanSettingInput({
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
	packageValue,
}: TimespanSettingInputProps) {
    /* Implementation Hidden */
}

export default TimespanSettingInput;

```