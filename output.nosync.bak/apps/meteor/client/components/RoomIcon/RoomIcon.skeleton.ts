## File: apps/meteor/client/components/RoomIcon/RoomIcon.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { Icon } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { isValidElement } from 'react';

import { OmnichannelRoomIcon } from './OmnichannelRoomIcon';
import { useRoomIcon } from '../../hooks/useRoomIcon';

export const RoomIcon = ({
	room,
	size = 'x16',
	isIncomingCall,
	placement = 'default',
}: {
	room: Pick<IRoom, 't' | 'prid' | 'teamMain' | 'uids' | 'u'>;
	size?: ComponentProps<typeof Icon>['size'];
	isIncomingCall?: boolean;
	placement?: 'sidebar' | 'default';
}) => {
    /* Implementation Hidden */
};

```