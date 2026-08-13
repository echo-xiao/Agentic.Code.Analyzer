## File: apps/meteor/client/views/room/hooks/useUserInfoActions/useUserInfoActions.ts

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import type { Icon } from '@rocket.chat/fuselage';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useEmbeddedLayout } from '@rocket.chat/ui-client';
import { useLayoutHiddenActions } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';

import { useAddUserAction } from './actions/useAddUserAction';
import { useBanUserAction } from './actions/useBanUserAction';
import { useBlockUserAction } from './actions/useBlockUserAction';
import { useChangeLeaderAction } from './actions/useChangeLeaderAction';
import { useChangeModeratorAction } from './actions/useChangeModeratorAction';
import { useChangeOwnerAction } from './actions/useChangeOwnerAction';
import { useDirectMessageAction } from './actions/useDirectMessageAction';
import { useIgnoreUserAction } from './actions/useIgnoreUserAction';
import { useMuteUserAction } from './actions/useMuteUserAction';
import { useRedirectModerationConsole } from './actions/useRedirectModerationConsole';
import { useRemoveUserAction } from './actions/useRemoveUserAction';
import { useReportUser } from './actions/useReportUser';
import { useUserMediaCallAction } from './actions/useUserMediaCallAction';
import { useVideoCallAction } from './actions/useVideoCallAction';

export type UserInfoActionType = 'communication' | 'privileges' | 'management' | 'moderation';

type UserInfoActionWithOnlyIcon = {
	type?: UserInfoActionType;
	content?: string;
	icon: ComponentProps<typeof Icon>['name'];
	title: string;
	variant?: 'danger';
	onClick: () => void;
	disabled?: boolean;
};

type UserInfoActionWithContent = {
	type?: UserInfoActionType;
	content: string;
	icon?: ComponentProps<typeof Icon>['name'];
	title?: string;
	variant?: 'danger';
	onClick: () => void;
	disabled?: boolean;
};

export type UserInfoAction = UserInfoActionWithContent | UserInfoActionWithOnlyIcon;

export type UserMenuAction = {
	id: string;
	title: string;
	items: GenericMenuItemProps[];
}[];

type UserInfoActionsParams = {
	user: Pick<IUser, '_id' | 'username' | 'name' | 'freeSwitchExtension'>;
	rid: IRoom['_id'];
	reload?: () => void;
	size?: number;
	isMember?: boolean;
	isInvited?: boolean;
};

type UseUserInfoActionsResult = {
	actions: [string, UserInfoAction][];
	menuActions: UserMenuAction | undefined;
};

export const useUserInfoActions = ({
	user,
	rid,
	reload,
	size = 2,
	isMember,
	isInvited,
}: UserInfoActionsParams): UseUserInfoActionsResult => {
    /* Implementation Hidden */
};

```