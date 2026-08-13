## File: apps/meteor/client/views/room/contextualBar/RoomMembers/RoomMembers.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Icon, TextInput, Select, Throbber, ButtonGroup, Button, Callout } from '@rocket.chat/fuselage';
import { useAutoFocus, useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import {
	VirtualizedScrollbars,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarFooter,
	ContextualbarEmptyContent,
	ContextualbarSection,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { ChangeEventHandler, ComponentProps, MouseEvent, ElementType } from 'react';
import { useId, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GroupedVirtuoso } from 'react-virtuoso';

import { MembersListDivider } from './MembersListDivider';
import RoomMembersRow from './RoomMembersRow';
import InfiniteListAnchor from '../../../../components/InfiniteListAnchor';
import ResultsLiveRegion from '../../../../components/ResultsLiveRegion';
import type { RoomMember } from '../../../hooks/useMembersList';

type RoomMembersProps = {
	rid: IRoom['_id'];
	isTeam?: boolean;
	isDirect?: boolean;
	isPending: boolean;
	isSuccess: boolean;
	text: string;
	type: string;
	setText: ChangeEventHandler<HTMLInputElement>;
	setType: (type: 'online' | 'all') => void;
	members: RoomMember[];
	total: number;
	error?: Error;
	onClickClose: () => void;
	onClickView: (e: MouseEvent<HTMLElement>) => void;
	onClickAdd?: () => void;
	onClickInvite?: () => void;
	loadMoreItems: () => void;
	renderRow?: ElementType<ComponentProps<typeof RoomMembersRow>>;
	reload: () => void;
	isABACRoom?: boolean;
};

const RoomMembers = ({
	isPending,
	isSuccess,
	members = [],
	text,
	type = 'online',
	setText,
	setType,
	onClickClose,
	onClickView,
	onClickAdd,
	onClickInvite,
	total,
	error,
	loadMoreItems,
	renderRow: RowComponent = RoomMembersRow,
	rid,
	isTeam,
	isDirect,
	reload,
	isABACRoom = false,
}: RoomMembersProps) => {
    /* Implementation Hidden */
};

export default RoomMembers;

```