## File: apps/meteor/client/views/room/UserCard/UserCardWithData.tsx

```typescript
import { getUserDisplayName } from '@rocket.chat/core-typings';
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useSetting, useRolesDescription } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LocalTime from '../../../components/LocalTime';
import { UserCard, UserCardAction, UserCardRole, UserCardSkeleton } from '../../../components/UserCard';
import { ReactiveUserStatus } from '../../../components/UserStatus';
import { ReactiveUserStatusText } from '../../../components/UserStatusText';
import { useUserInfoQuery } from '../../../hooks/useUserInfoQuery';
import { useMemberExists } from '../../hooks/useMemberExists';
import { useUserInfoActions } from '../hooks/useUserInfoActions';
import type { UserInfoAction } from '../hooks/useUserInfoActions/useUserInfoActions';

type UserCardWithDataProps = {
	username: string;
	rid: IRoom['_id'];
	onOpenUserInfo: () => void;
	onClose: () => void;
};

const UserCardWithData = ({ username, rid, onOpenUserInfo, onClose }: UserCardWithDataProps) => {
    /* Implementation Hidden */
};

export default UserCardWithData;

```