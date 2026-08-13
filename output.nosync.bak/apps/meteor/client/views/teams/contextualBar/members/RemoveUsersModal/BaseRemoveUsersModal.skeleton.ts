## File: apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/BaseRemoveUsersModal.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { usePermission } from '@rocket.chat/ui-contexts';
import { useState, useCallback } from 'react';

import RemoveUsersFirstStep from './RemoveUsersFirstStep';
import RemoveUsersSecondStep from './RemoveUsersSecondStep';

const STEPS = {
	LIST_ROOMS: 'LIST_ROOMS',
	CONFIRM_DELETE: 'CONFIRM_DELETE',
};

type BaseRemoveUsersModalProps = {
	onClose: () => void;
	onCancel: () => void;
	onConfirm: (deletedRooms: { [key: string]: Serialized<IRoom> }) => void;
	currentStep?: string;
	rooms?: (Serialized<IRoom> & { isLastOwner?: boolean })[];
	username?: string;
};

const BaseRemoveUsersModal = ({
	onClose,
	onCancel,
	onConfirm,
	rooms,
	currentStep = rooms?.length === 0 ? STEPS.CONFIRM_DELETE : STEPS.LIST_ROOMS,
	username,
}: BaseRemoveUsersModalProps) => {
    /* Implementation Hidden */
};

export default BaseRemoveUsersModal;

```