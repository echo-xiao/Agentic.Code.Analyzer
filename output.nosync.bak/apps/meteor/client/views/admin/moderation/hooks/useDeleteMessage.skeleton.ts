## File: apps/meteor/client/views/admin/moderation/hooks/useDeleteMessage.tsx

```typescript
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const useDeleteMessage = (mid: string, rid: string, onChange: () => void) => {
    /* Implementation Hidden */
};

export default useDeleteMessage;

```