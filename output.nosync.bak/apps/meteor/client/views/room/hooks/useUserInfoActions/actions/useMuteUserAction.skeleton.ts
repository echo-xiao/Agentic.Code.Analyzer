## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useMuteUserAction.tsx

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { escapeHTML } from '@rocket.chat/string-helpers';
import { GenericModal } from '@rocket.chat/ui-client';
import {
	useAllPermissions,
	usePermission,
	useSetModal,
	useToastMessageDispatch,
	useTranslation,
	useUserRoom,
	useUserSubscription,
	useEndpoint,
} from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';
import { getRoomDirectives } from '../../../lib/getRoomDirectives';
import type { UserInfoAction, UserInfoActionType } from '../useUserInfoActions';

const getUserIsMuted = (
	user: Pick<IUser, '_id' | 'username'>,
	room: IRoom | undefined,
	userCanPostReadonly: boolean,
): boolean | undefined => {
    /* Implementation Hidden */
};

export const useMuteUserAction = (user: Pick<IUser, '_id' | 'username'>, rid: IRoom['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```