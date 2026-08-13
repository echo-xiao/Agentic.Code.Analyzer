## File: apps/meteor/client/components/message/hooks/useUnstarMessageMutation.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { toggleStarredMessage } from '../../../lib/mutationEffects/starredMessage';
import { roomsQueryKeys } from '../../../lib/queryKeys';

export const useUnstarMessageMutation = () => {
    /* Implementation Hidden */
};

```