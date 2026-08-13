## File: apps/meteor/client/lib/utils/callWithErrorHandling.ts

```typescript
import type { ServerMethodName, ServerMethodParameters, ServerMethodReturn } from '@rocket.chat/ddp-client';

import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { dispatchToastMessage } from '../toast';

export const callWithErrorHandling = async <M extends ServerMethodName>(
	method: M,
	...params: ServerMethodParameters<M>
): Promise<ServerMethodReturn<M>> => {
    /* Implementation Hidden */
};

```