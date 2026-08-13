## File: apps/meteor/client/views/room/contextualBar/BannedUsers/BannedUsersItem.tsx

```typescript
import { Box, Icon, Option, OptionAvatar, OptionColumn, OptionContent, OptionDescription, OptionMenu } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getUserDisplayNames } from '../../../../../lib/getUserDisplayNames';
import { normalizeUsername } from '../../../../../lib/utils/normalizeUsername';
import { ReactiveUserStatus } from '../../../../components/UserStatus';
import type { BannedUser } from '../../../hooks/useRoomBannedUsers';

type BannedUsersItemProps = {
	user: BannedUser;
	useRealName: boolean;
	onClickUnban: (username: string) => void;
};

const BannedUsersItem = ({ user, useRealName, onClickUnban }: BannedUsersItemProps) => {
    /* Implementation Hidden */
};

export default BannedUsersItem;

```