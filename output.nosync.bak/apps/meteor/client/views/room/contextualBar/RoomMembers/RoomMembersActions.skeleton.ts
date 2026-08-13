## File: apps/meteor/client/views/room/contextualBar/RoomMembers/RoomMembersActions.tsx

```typescript
import type { IUser, IRoom } from '@rocket.chat/core-typings';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useUserInfoActions } from '../../hooks/useUserInfoActions';

type RoomMembersActionsProps = Pick<IUser, '_id' | 'name' | 'username' | 'freeSwitchExtension'> & {
	rid: IRoom['_id'];
	isInvited?: boolean;
	reload: () => void;
};

const RoomMembersActions = ({ username, _id, name, rid, freeSwitchExtension, isInvited, reload }: RoomMembersActionsProps) => {
    /* Implementation Hidden */
};

export default RoomMembersActions;

```