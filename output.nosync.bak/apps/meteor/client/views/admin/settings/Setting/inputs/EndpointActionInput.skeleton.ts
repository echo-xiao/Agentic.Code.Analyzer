## File: apps/meteor/client/views/admin/settings/Setting/inputs/EndpointActionInput.tsx

```typescript
import type { Method, PathPattern } from '@rocket.chat/rest-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';

import type { ActionInputBaseProps } from './ActionInputBase';
import ActionInputBase from './ActionInputBase';

export type EndpointActionInputProps = Omit<ActionInputBaseProps, 'onAction'> & {
	endpoint: {
		method: Method;
		path: PathPattern;
	};
};

function EndpointActionInput({ endpoint, ...rest }: EndpointActionInputProps) {
    /* Implementation Hidden */
}

export default EndpointActionInput;

```