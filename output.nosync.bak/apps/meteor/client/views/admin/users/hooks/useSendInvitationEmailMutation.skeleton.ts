## File: apps/meteor/client/views/admin/users/hooks/useSendInvitationEmailMutation.ts

```typescript
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

type UseSendInvitationEmailMutationVariables = {
	emails: string[];
};

export const useSendInvitationEmailMutation = (): UseMutationResult<
	{ success: boolean },
	Error,
	UseSendInvitationEmailMutationVariables
> => {
    /* Implementation Hidden */
};

```