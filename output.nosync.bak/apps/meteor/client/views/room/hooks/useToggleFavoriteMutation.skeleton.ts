## File: apps/meteor/client/views/room/hooks/useToggleFavoriteMutation.ts

```typescript
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useEndpoint, useToastMessageDispatch, useUserId } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { toggleFavoriteRoom } from '../../../lib/mutationEffects/room';
import { subscriptionsQueryKeys } from '../../../lib/queryKeys';

export const useToggleFavoriteMutation = () => {
    /* Implementation Hidden */
};

```