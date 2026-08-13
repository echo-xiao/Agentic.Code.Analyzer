## File: apps/meteor/client/lib/utils/setMessageJumpQueryStringParameter.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import type { LocationPathname } from '@rocket.chat/ui-contexts';

import { router } from '../../providers/RouterProvider';

export const setMessageJumpQueryStringParameter = async (msg: IMessage['_id'] | null, context?: 'jumpToUnread') => {
    /* Implementation Hidden */
};

```