## File: apps/meteor/client/views/room/hooks/useUserInfoActions/actions/useChangeOwnerAction.tsx

```typescript
import type { IRoom, IUser } from '@rocket.chat/core-typings';
import { isRoomFederated, isRoomNativeFederated } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { escapeHTML } from '@rocket.chat/string-helpers';
import { GenericModal } from '@rocket.chat/ui-client';
import {
	useTranslation,
	usePermission,
	useUserRoom,
	useUserSubscription,
	useSetModal,
	useUser,
	useToastMessageDispatch,
	useEndpoint,
} from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';
import { getRoomDirectives } from '../../../lib/getRoomDirectives';
import { useUserHasRoomRole } from '../../useUserHasRoomRole';
import type { UserInfoAction, UserInfoActionType } from '../useUserInfoActions';

const getWarningModalForFederatedRooms = (
	closeModalFn: () => void,
	handleConfirmFn: () => void,
	title: string,
	confirmText: string,
	bodyText: string,
) => (
	<GenericModal
		variant='warning'
		onClose={closeModalFn}
		onConfirm={handleConfirmFn}
		onCancel={closeModalFn}
		title={title}
		confirmText={confirmText}
	>
		{bodyText}
	</GenericModal>
);

const getEndpoint = (roomType: string, isOwner: boolean) => {
    /* Implementation Hidden */
};

export const useChangeOwnerAction = (user: Pick<IUser, '_id' | 'username'>, rid: IRoom['_id']): UserInfoAction | undefined => {
    /* Implementation Hidden */
};

```