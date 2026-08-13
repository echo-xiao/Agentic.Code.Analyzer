## File: apps/meteor/client/views/room/Header/HeaderIconWithRoom.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { HeaderIcon } from '@rocket.chat/ui-client';

import { OmnichannelRoomIcon } from '../../../components/RoomIcon/OmnichannelRoomIcon';
import { useRoomIcon } from '../../../hooks/useRoomIcon';

export type HeaderIconWithRoomProps = {
	room: IRoom;
};

const HeaderIconWithRoom = ({ room }: HeaderIconWithRoomProps) => {
    /* Implementation Hidden */
};

export default HeaderIconWithRoom;

```