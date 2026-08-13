## File: apps/meteor/client/views/admin/moderation/hooks/useDismissUserAction.tsx

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useRouter, useSetModal, useToastMessageDispatch, useRouteParameter } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const useDismissUserAction = (userId: string, isUserReport?: boolean): GenericMenuItemProps => {
    /* Implementation Hidden */
};

export default useDismissUserAction;

```