## File: apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/BaseConvertToChannelModal.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useState, useCallback } from 'react';

import FirstStep from './ModalSteps/FirstStep';
import SecondStep from './ModalSteps/SecondStep';

const STEPS = {
	LIST_ROOMS: 'LIST_ROOMS',
	CONFIRM_CONVERT: 'CONFIRM_CONVERT',
};

type BaseConvertToChannelModalProps = {
	onClose: () => void;
	onCancel: () => void;
	onConfirm: (deletedRooms: { [key: string]: Serialized<IRoom> }) => void;
	currentStep?: string;
	rooms?: (Serialized<IRoom> & { isLastOwner?: boolean })[];
};

const BaseConvertToChannelModal = ({
	onClose,
	onCancel,
	onConfirm,
	rooms,
	currentStep = rooms?.length === 0 ? STEPS.CONFIRM_CONVERT : STEPS.LIST_ROOMS,
}: BaseConvertToChannelModalProps) => {
    /* Implementation Hidden */
};

export default BaseConvertToChannelModal;

```