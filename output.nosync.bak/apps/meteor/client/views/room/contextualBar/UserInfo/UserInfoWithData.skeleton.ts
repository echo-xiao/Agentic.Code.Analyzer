## File: apps/meteor/client/views/room/contextualBar/UserInfo/UserInfoWithData.tsx

```typescript
import type { IUser, IRoom } from '@rocket.chat/core-typings';
import { Callout } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarBack,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useEndpoint, useRolesDescription } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import UserInfoActions from './UserInfoActions';
import { getUserEmailAddress } from '../../../../../lib/getUserEmailAddress';
import { FormSkeleton } from '../../../../components/Skeleton';
import { UserCardRole } from '../../../../components/UserCard';
import { UserInfo } from '../../../../components/UserInfo';
import { ReactiveUserStatus } from '../../../../components/UserStatus';
import { ReactiveUserStatusText } from '../../../../components/UserStatusText';
import { usersQueryKeys } from '../../../../lib/queryKeys';
import { getUserEmailVerified } from '../../../../lib/utils/getUserEmailVerified';

export type UserInfoWithDataProps = {
	uid?: IUser['_id'];
	username?: IUser['username'];
	rid: IRoom['_id'];
	invitationDate?: string;
	onClose: () => void;
	onClickBack?: () => void;
};

const UserInfoWithData = ({ uid, username, rid, invitationDate, onClose, onClickBack }: UserInfoWithDataProps) => {
    /* Implementation Hidden */
};

export default UserInfoWithData;

```