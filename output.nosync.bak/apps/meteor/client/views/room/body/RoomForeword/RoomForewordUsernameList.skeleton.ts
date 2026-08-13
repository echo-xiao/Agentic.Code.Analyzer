## File: apps/meteor/client/views/room/body/RoomForeword/RoomForewordUsernameList.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Margins } from '@rocket.chat/fuselage';

import RoomForewordUsernameListItem from './RoomForewordUsernameListItem';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';

type RoomForewordUsernameListProps = { usernames: Array<NonNullable<IUser['username']>> };

const RoomForewordUsernameList = ({ usernames }: RoomForewordUsernameListProps) => {
    /* Implementation Hidden */
};

export default RoomForewordUsernameList;

```