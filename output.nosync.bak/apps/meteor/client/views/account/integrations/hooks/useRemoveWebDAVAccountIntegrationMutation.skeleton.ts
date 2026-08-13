## File: apps/meteor/client/views/account/integrations/hooks/useRemoveWebDAVAccountIntegrationMutation.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

type UseRemoveWebDAVAccountIntegrationMutationOptions = Omit<UseMutationOptions<void, unknown, { accountSelected: string }>, 'mutationFn'>;

export const useRemoveWebDAVAccountIntegrationMutation = (options?: UseRemoveWebDAVAccountIntegrationMutationOptions) => {
    /* Implementation Hidden */
};

```