## File: apps/meteor/client/views/omnichannel/ExternalFrameContainer.tsx

```typescript
import { useSetting, useUserId } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { encrypt, getKeyFromString } from '../../../app/livechat/client/externalFrame/crypto';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import { useRoom } from '../room/contexts/RoomContext';

function ExternalFrameContainer() {
    /* Implementation Hidden */
}

export default ExternalFrameContainer;

```