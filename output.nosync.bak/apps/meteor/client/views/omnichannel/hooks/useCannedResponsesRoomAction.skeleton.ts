## File: apps/meteor/client/views/omnichannel/hooks/useCannedResponsesRoomAction.ts

```typescript
import { useSetting } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

const CannedResponse = lazy(() => import('../cannedResponses/contextualBar/CannedResponse/WrapCannedResponseList'));

export const useCannedResponsesRoomAction = () => {
    /* Implementation Hidden */
};

```