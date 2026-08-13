## File: apps/meteor/client/views/omnichannel/cannedResponses/modals/useRemoveCannedResponse.tsx

```typescript
import type { IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useRouter, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useRemoveCannedResponse = (id: IOmnichannelCannedResponse['_id']) => {
    /* Implementation Hidden */
};

```