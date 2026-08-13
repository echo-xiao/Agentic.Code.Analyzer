## File: apps/meteor/client/views/omnichannel/agents/hooks/useRemoveAgent.tsx

```typescript
import type { ILivechatAgent } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useTranslation, useRouter, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';

import { omnichannelQueryKeys } from '../../../../lib/queryKeys';

export const useRemoveAgent = (uid: ILivechatAgent['_id']) => {
    /* Implementation Hidden */
};

```