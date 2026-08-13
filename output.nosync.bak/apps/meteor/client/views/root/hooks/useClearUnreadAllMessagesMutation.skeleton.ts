## File: apps/meteor/client/views/root/hooks/useClearUnreadAllMessagesMutation.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { Subscriptions } from '../../../stores';

export const useClearUnreadAllMessagesMutation = (options?: Omit<UseMutationOptions<void, unknown, void, unknown>, 'mutationFn'>) => {
    /* Implementation Hidden */
};

```