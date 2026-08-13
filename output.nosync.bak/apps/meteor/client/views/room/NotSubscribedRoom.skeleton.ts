## File: apps/meteor/client/views/room/NotSubscribedRoom.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box, States, StatesAction, StatesActions, StatesIcon, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import { Trans, useTranslation } from 'react-i18next';

import RoomLayout from './layout/RoomLayout';
import { useJoinRoom } from '../../hooks/useJoinRoom';

type NotSubscribedRoomProps = {
	rid: IRoom['_id'];
	reference: string;
	type: IRoom['t'];
};

const NotSubscribedRoom = ({ rid, reference, type }: NotSubscribedRoomProps) => {
    /* Implementation Hidden */
};

export default NotSubscribedRoom;

```