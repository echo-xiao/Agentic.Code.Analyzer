## File: apps/meteor/client/components/message/hooks/usePinMessageMutation.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { updatePinMessage } from '../../../lib/mutationEffects/updatePinMessage';
import { roomsQueryKeys } from '../../../lib/queryKeys';

export const usePinMessageMutation = () => {
    /* Implementation Hidden */
};

```