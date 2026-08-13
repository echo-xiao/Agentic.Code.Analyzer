## File: apps/meteor/client/views/room/contextualBar/RoomMembers/RoomMembersWithData.tsx

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { isRoomFederated, isDirectMessageRoom, isTeamRoom, isRoomNativeFederated } from '@rocket.chat/core-typings';
import { useStableCallback, useDebouncedValue, useLocalStorage } from '@rocket.chat/fuselage-hooks';
import {
	useUserRoom,
	useAtLeastOnePermission,
	useUser,
	usePermission,
	useUserSubscription,
	useRoomToolbox,
} from '@rocket.chat/ui-contexts';
import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import AddUsers from './AddUsers';
import InviteUsers from './InviteUsers';
import RoomMembers from './RoomMembers';
import * as Federation from '../../../../lib/federation/Federation';
import { useMembersList } from '../../../hooks/useMembersList';
import UserInfoWithData from '../UserInfo';

enum ROOM_MEMBERS_TABS {
	INFO = 'user-info',
	INVITE = 'invite-users',
	ADD = 'add-users',
	LIST = 'users-list',
}

type validRoomType = 'd' | 'p' | 'c';

const RoomMembersWithData = ({ rid }: { rid: IRoom['_id'] }) => {
    /* Implementation Hidden */
};

export default RoomMembersWithData;

```