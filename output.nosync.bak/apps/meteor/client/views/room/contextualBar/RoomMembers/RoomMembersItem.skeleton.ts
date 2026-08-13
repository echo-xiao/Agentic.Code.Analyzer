## File: apps/meteor/client/views/room/contextualBar/RoomMembers/RoomMembersItem.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import {
	Option,
	OptionAvatar,
	OptionColumn,
	OptionDescription,
	OptionMenu,
	OptionContent,
	Icon,
	IconButton,
	OptionSkeleton,
} from '@rocket.chat/fuselage';
import { usePrefersReducedMotion } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import type { MouseEvent } from 'react';
import { useState } from 'react';

import UserActions from './RoomMembersActions';
import { getUserDisplayNames } from '../../../../../lib/getUserDisplayNames';
import InvitationBadge from '../../../../components/InvitationBadge';
import { ReactiveUserStatus } from '../../../../components/UserStatus';
import { usePreventPropagation } from '../../../../hooks/usePreventPropagation';
import { useUserStatusTooltip } from '../../../../hooks/useUserStatusTooltip';
import type { RoomMember } from '../../../hooks/useMembersList';

type RoomMembersItemProps = Pick<RoomMember, 'federated' | 'username' | 'name' | '_id' | 'freeSwitchExtension' | 'subscription'> & {
	rid: IRoom['_id'];
	useRealName: boolean;
	reload: () => void;
	onClickView: (e: MouseEvent<HTMLElement>) => void;
};

const RoomMembersItem = ({
	_id,
	name,
	username,
	federated,
	freeSwitchExtension,
	onClickView,
	rid,
	subscription,
	reload,
	useRealName,
}: RoomMembersItemProps) => {
    /* Implementation Hidden */
};

export default Object.assign(RoomMembersItem, {
	Skeleton: OptionSkeleton,
});

```