## File: apps/meteor/client/hooks/useRoomIcon.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isRoomFederated, isDirectMessageRoom } from '@rocket.chat/core-typings';
import type { Icon } from '@rocket.chat/fuselage';
import type { ComponentProps, ReactElement } from 'react';

import { ReactiveUserStatus } from '../components/UserStatus';

export const useRoomIcon = (
	room: Pick<IRoom, 't' | 'prid' | 'teamMain' | 'uids' | 'u' | 'abacAttributes'>,
): ComponentProps<typeof Icon> | ReactElement<any> | null => {
    /* Implementation Hidden */
};

```