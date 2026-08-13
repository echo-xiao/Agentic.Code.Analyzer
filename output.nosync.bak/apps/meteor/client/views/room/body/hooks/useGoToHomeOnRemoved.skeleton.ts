## File: apps/meteor/client/views/room/body/hooks/useGoToHomeOnRemoved.ts

```typescript
import { isOmnichannelRoom, type IRoom } from '@rocket.chat/core-typings';
import { useRouter, useStream, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { roomsQueryKeys } from '../../../../lib/queryKeys';
import { useOmnichannelCloseRoute } from '../../../omnichannel/hooks/useOmnichannelCloseRoute';

export function useGoToHomeOnRemoved(room: IRoom, userId?: string): void {
    /* Implementation Hidden */
}

```