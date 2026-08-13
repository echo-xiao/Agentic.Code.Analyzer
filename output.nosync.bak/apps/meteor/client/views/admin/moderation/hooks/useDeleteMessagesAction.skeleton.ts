## File: apps/meteor/client/views/admin/moderation/hooks/useDeleteMessagesAction.tsx

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useRouteParameter, useRouter, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const useDeleteMessagesAction = (userId: string): GenericMenuItemProps => {
    /* Implementation Hidden */
};

export default useDeleteMessagesAction;

```