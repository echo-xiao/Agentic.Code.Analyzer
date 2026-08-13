## File: apps/meteor/client/views/admin/settings/Setting/inputs/RoomPickSettingInput.tsx

```typescript
import type { SettingValueRoomPick } from '@rocket.chat/core-typings';
import { Field, FieldHint, FieldLabel, FieldRow } from '@rocket.chat/fuselage';

import RoomAutoCompleteMultiple from '../../../../../components/RoomAutoCompleteMultiple';
import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';

export type RoomPickSettingInputProps = SettingInputProps<SettingValueRoomPick | '', SettingValueRoomPick>;

function RoomPickSettingInput({
	_id,
	label,
	value,
	hint,
	placeholder,
	readonly,
	disabled,
	required,
	hasResetButton,
	onChangeValue,
	onResetButtonClick,
}: RoomPickSettingInputProps) {
    /* Implementation Hidden */
}

export default RoomPickSettingInput;

```