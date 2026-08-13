## File: apps/meteor/client/views/admin/settings/Setting/inputs/ActionSettingInput.tsx

```typescript
import { isActionSettingWithEndpoint } from '@rocket.chat/core-typings';
import type { ServerMethods } from '@rocket.chat/ddp-client';
import type { PathPattern, Method } from '@rocket.chat/rest-typings';
import type { TranslationKey } from '@rocket.chat/ui-contexts';

import EndpointActionInput from './EndpointActionInput';
import MethodActionInput from './MethodActionInput';
import type { SettingInputProps } from './types';

export type ActionSettingInputProps = SettingInputProps & {
	value: keyof ServerMethods | { method: Method; path: PathPattern };
	actionText: TranslationKey;
	sectionChanged: boolean;
};

function ActionSettingInput({ value, ...rest }: ActionSettingInputProps) {
    /* Implementation Hidden */
}

export default ActionSettingInput;

```