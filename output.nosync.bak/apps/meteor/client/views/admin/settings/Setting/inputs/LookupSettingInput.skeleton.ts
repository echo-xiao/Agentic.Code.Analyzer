## File: apps/meteor/client/views/admin/settings/Setting/inputs/LookupSettingInput.tsx

```typescript
import { Field, FieldHint, FieldLabel, FieldRow, Select } from '@rocket.chat/fuselage';
import type { PathPattern } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import ResetSettingButton from '../ResetSettingButton';
import type { SettingInputProps } from './types';
import { miscQueryKeys } from '../../../../../lib/queryKeys';

export type LookupSettingInputProps = SettingInputProps & {
	lookupEndpoint: PathPattern extends `/${infer U}` ? U : PathPattern;
};

function LookupSettingInput({
	_id,
	label,
	value,
	hint,
	placeholder,
	readonly,
	autocomplete,
	disabled,
	required,
	lookupEndpoint,
	hasResetButton,
	onChangeValue,
	onResetButtonClick,
}: LookupSettingInputProps) {
    /* Implementation Hidden */
}

export default LookupSettingInput;

```