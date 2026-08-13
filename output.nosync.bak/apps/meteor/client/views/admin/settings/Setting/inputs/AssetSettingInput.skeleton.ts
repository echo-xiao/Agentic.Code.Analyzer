## File: apps/meteor/client/views/admin/settings/Setting/inputs/AssetSettingInput.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Button, Field, FieldHint, FieldLabel, FieldRow, Icon, Palette } from '@rocket.chat/fuselage';
import { Random } from '@rocket.chat/random';
import { useToastMessageDispatch, useEndpoint, useTranslation, useUpload } from '@rocket.chat/ui-contexts';
import type { ChangeEventHandler, DragEvent, SyntheticEvent } from 'react';

import type { SettingInputProps } from './types';

export type AssetSettingInputProps = Omit<SettingInputProps<{ url: string }>, 'onChangeValue'> & {
	asset?: any;
	fileConstraints?: { extensions: string[] };
};

function AssetSettingInput({ _id, label, value, hint, asset, required, disabled, fileConstraints }: AssetSettingInputProps) {
    /* Implementation Hidden */
}

export default AssetSettingInput;

```