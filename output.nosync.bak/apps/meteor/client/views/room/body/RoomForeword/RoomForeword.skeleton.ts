## File: apps/meteor/client/views/room/body/RoomForeword/RoomForeword.tsx

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { isDirectMessageRoom } from '@rocket.chat/core-typings';
import { FlexItem, Box } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useTranslation } from 'react-i18next';

import RoomForewordUsernameList from './RoomForewordUsernameList';

type RoomForewordProps = { user: IUser | null; room: IRoom };

const RoomForeword = ({ user, room }: RoomForewordProps) => {
    /* Implementation Hidden */
};

export default RoomForeword;

```