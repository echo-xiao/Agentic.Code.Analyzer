## File: apps/meteor/client/views/admin/moderation/hooks/useDeactivateUserAction.tsx

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useRouteParameter, useRouter, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const useDeactivateUserAction = (userId: string, isUserReport?: boolean): GenericMenuItemProps => {
    /* Implementation Hidden */
};

export default useDeactivateUserAction;

```