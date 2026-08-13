## File: apps/meteor/client/views/hooks/useMembersList.ts

```typescript
import type { IRole, IUser, AtLeast, ISubscription, Serialized } from '@rocket.chat/core-typings';
import { useEndpoint, useSetting, useStream } from '@rocket.chat/ui-contexts';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { calculateRoomRolePriorityFromRoles } from '../../../lib/roles/calculateRoomRolePriorityFromRoles';
import { roomsQueryKeys } from '../../lib/queryKeys';

type MembersListOptions = {
	rid: string;
	type: 'all' | 'online';
	limit: number;
	debouncedText: string;
	roomType: 'd' | 'p' | 'c';
};

const endpointsByRoomType = {
	d: '/v1/im.members',
	p: '/v1/rooms.membersOrderedByRole',
	c: '/v1/rooms.membersOrderedByRole',
} as const;

export type RoomMember = Serialized<
	Pick<IUser, 'username' | '_id' | 'name' | 'status' | 'federated' | 'freeSwitchExtension'> & { roles?: IRole['_id'][] } & {
		subscription: Pick<ISubscription, '_id' | 'status' | 'ts' | 'roles'>;
	}
>;

type MembersListPage = {
	members: RoomMember[];
	count: number;
	total: number;
	offset: number;
};

const getSortedMembers = (members: RoomMember[], useRealName = false) => {
    /* Implementation Hidden */
};

const updateMemberInCache = (
	options: MembersListOptions,
	queryClient: QueryClient,
	memberId: string,
	role: AtLeast<IRole, '_id'>,
	type: 'removed' | 'changed' | 'added',
	useRealName = false,
) => {
    /* Implementation Hidden */
};

export const useMembersList = (options: MembersListOptions) => {
    /* Implementation Hidden */
};

```