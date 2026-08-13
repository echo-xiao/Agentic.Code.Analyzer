## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useRemoveUserAction.tsx

```typescript
import type { IRoom, IUser, Serialized } from '@rocket.chat/core-typings';
import { isRoomFederated, isRoomNativeFederated } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { escapeHTML } from '@rocket.chat/string-helpers';
import { GenericModal } from '@rocket.chat/ui-client';
import {
	usePermission,
	useSetModal,
	useToastMessageDispatch,
	useTranslation,
	useUser,
	useUserRoom,
	useUserSubscription,
} from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useEndpointMutation } from '../../../../../hooks/useEndpointMutation';
import * as Federation from '../../../../../lib/federation/Federation';
import { roomsQueryKeys } from '../../../../../lib/queryKeys';
import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';
import RemoveUsersModal from '../../../../teams/contextualBar/members/RemoveUsersModal';
import { getRoomDirectives } from '../../../lib/getRoomDirectives';
import type { UserInfoAction } from '../useUserInfoActions';

export const useRemoveUserAction = (
	user: Pick<IUser, '_id' | 'username'>,
	rid: IRoom['_id'],
	reload?: () => void,
	invited?: boolean,
): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```