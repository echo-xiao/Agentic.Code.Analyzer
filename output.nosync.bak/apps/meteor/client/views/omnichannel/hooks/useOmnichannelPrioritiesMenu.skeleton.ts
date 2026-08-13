## File: apps/meteor/client/views/omnichannel/hooks/useOmnichannelPrioritiesMenu.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { LivechatPriorityWeight } from '@rocket.chat/core-typings';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useOmnichannelPriorities } from './useOmnichannelPriorities';
import { PRIORITIES_CONFIG } from './useOmnichannelPrioritiesConfig';
import { roomsQueryKeys } from '../../../lib/queryKeys';

export const useOmnichannelPrioritiesMenu = (rid: IRoom['_id']) => {
    /* Implementation Hidden */
};

```