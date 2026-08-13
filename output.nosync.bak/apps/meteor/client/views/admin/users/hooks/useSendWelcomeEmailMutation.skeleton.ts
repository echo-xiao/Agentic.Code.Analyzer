## File: apps/meteor/client/views/admin/users/hooks/useSendWelcomeEmailMutation.ts

```typescript
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type useSendWelcomeEmailMutationProps = {
	email: string | undefined;
};

export const useSendWelcomeEmailMutation = (): UseMutationResult<null, Error, useSendWelcomeEmailMutationProps> => {
    /* Implementation Hidden */
};

```