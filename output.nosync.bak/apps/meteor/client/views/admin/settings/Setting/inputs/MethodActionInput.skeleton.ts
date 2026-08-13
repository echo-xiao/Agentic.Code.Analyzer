## File: apps/meteor/client/views/admin/settings/Setting/inputs/MethodActionInput.tsx

```typescript
import type { ServerMethods } from '@rocket.chat/ddp-client';
import { useMethod } from '@rocket.chat/ui-contexts';

import type { ActionInputBaseProps } from './ActionInputBase';
import ActionInputBase from './ActionInputBase';

export type MethodActionInputProps = Omit<ActionInputBaseProps, 'onAction'> & {
	value: keyof ServerMethods;
};

function MethodActionInput({ value, ...rest }: MethodActionInputProps) {
    /* Implementation Hidden */
}

export default MethodActionInput;

```