## File: apps/meteor/client/views/admin/moderation/hooks/useResetAvatarAction.tsx

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const useResetAvatarAction = (userId: string): GenericMenuItemProps => {
    /* Implementation Hidden */
};

export default useResetAvatarAction;

```