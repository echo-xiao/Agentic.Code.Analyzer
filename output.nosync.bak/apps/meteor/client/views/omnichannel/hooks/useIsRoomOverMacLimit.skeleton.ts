## File: apps/meteor/client/views/omnichannel/hooks/useIsRoomOverMacLimit.ts

```typescript
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import type { IRoom, IOmnichannelGenericRoom } from '@rocket.chat/core-typings';

import { useIsOverMacLimit } from './useIsOverMacLimit';

const getPeriod = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

export const useIsRoomOverMacLimit = (room: IRoom) => {
    /* Implementation Hidden */
};

```