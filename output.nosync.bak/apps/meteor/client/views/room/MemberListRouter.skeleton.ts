## File: apps/meteor/client/views/room/MemberListRouter.tsx

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { useUserId, useRoomToolbox } from '@rocket.chat/ui-contexts';

import { useRoom } from './contexts/RoomContext';
import RoomMembers from './contextualBar/RoomMembers';
import UserInfo from './contextualBar/UserInfo';

const getUid = (room: IRoom, ownUserId: IUser['_id'] | undefined) => {
    /* Implementation Hidden */
};

const MemberListRouter = () => {
    /* Implementation Hidden */
};

export default MemberListRouter;

```