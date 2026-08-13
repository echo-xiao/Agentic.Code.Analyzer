## File: apps/meteor/client/views/room/contextualBar/Info/RoomInfoRouter.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useState } from 'react';

import EditRoomInfoWithData from './EditRoomInfo';
import RoomInfo from './RoomInfo';
import { useCanEditRoom } from './hooks/useCanEditRoom';
import { useRoom } from '../../contexts/RoomContext';

type RoomInfoRouterProps = {
	onClickBack?: () => void;
	onEnterRoom?: (room: IRoom) => void;
	resetState?: () => void;
};

const RoomInfoRouter = ({ onClickBack, onEnterRoom, resetState }: RoomInfoRouterProps) => {
    /* Implementation Hidden */
};

export default RoomInfoRouter;

```