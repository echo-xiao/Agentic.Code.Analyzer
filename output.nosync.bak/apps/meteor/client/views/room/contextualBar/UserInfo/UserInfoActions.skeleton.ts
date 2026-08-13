## File: apps/meteor/client/views/room/contextualBar/UserInfo/UserInfoActions.tsx

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { ButtonGroup, IconButton, Skeleton } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { UserInfoAction } from '../../../../components/UserInfo';
import { useMemberExists } from '../../../hooks/useMemberExists';
import type { UserInfoAction as UserInfoActionType } from '../../hooks/useUserInfoActions';
import { useUserInfoActions } from '../../hooks/useUserInfoActions';

export type UserInfoActionsProps = {
	user: Pick<IUser, '_id' | 'username' | 'name' | 'freeSwitchExtension'>;
	rid: IRoom['_id'];
	isInvited?: boolean;
	backToList?: () => void;
};

const UserInfoActions = ({ user, rid, isInvited, backToList }: UserInfoActionsProps) => {
    /* Implementation Hidden */
};

export default UserInfoActions;

```