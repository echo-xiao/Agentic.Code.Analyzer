## File: apps/meteor/client/views/room/contextualBar/RoomMembers/RoomMembersRow.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import type { MouseEvent } from 'react';
import { memo } from 'react';

import RoomMembersItem from './RoomMembersItem';
import type { RoomMember } from '../../../hooks/useMembersList';

type RoomMembersRowProps = {
	user: Pick<RoomMember, 'federated' | 'username' | 'name' | '_id' | 'freeSwitchExtension' | 'subscription'>;
	data: {
		onClickView: (e: MouseEvent<HTMLElement>) => void;
		rid: IRoom['_id'];
	};
	index: number;
	reload: () => void;
	useRealName: boolean;
};

const RoomMembersRow = ({ user, data: { onClickView, rid }, index, reload, useRealName }: RoomMembersRowProps) => {
    /* Implementation Hidden */
};

export default memo(RoomMembersRow);

```