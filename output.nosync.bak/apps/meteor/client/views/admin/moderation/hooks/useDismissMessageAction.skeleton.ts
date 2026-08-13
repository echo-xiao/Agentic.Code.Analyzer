## File: apps/meteor/client/views/admin/moderation/hooks/useDismissMessageAction.tsx

```typescript
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useDismissMessageAction = (msgId: string): { action: () => void } => {
    /* Implementation Hidden */
};

```