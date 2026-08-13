## File: apps/meteor/client/views/room/contextualBar/BannedUsers/BannedUsers.tsx

```typescript
import { Box, Throbber } from '@rocket.chat/fuselage';
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import {
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarDialog,
	ContextualbarEmptyContent,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	VirtualizedScrollbars,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import BannedUsersItem from './BannedUsersItem';
import type { BannedUser } from '../../../hooks/useRoomBannedUsers';

type BannedUsersProps = {
	loading: boolean;
	error?: Error;
	useRealName?: boolean;
	bannedUsers: BannedUser[];
	onClickClose: () => void;
	onClickUnban: (username: string) => void;
	onLoadMore: () => void;
};

const BannedUsers = ({ loading, error, bannedUsers, useRealName = false, onClickClose, onClickUnban, onLoadMore }: BannedUsersProps) => {
    /* Implementation Hidden */
};

export default BannedUsers;

```