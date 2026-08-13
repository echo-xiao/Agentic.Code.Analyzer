## File: apps/meteor/client/views/room/modals/E2EEModals/BaseDisableE2EEModal.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useState } from 'react';

import DisableE2EEModal from './DisableE2EEModal';
import ResetKeysE2EEModal from './ResetKeysE2EEModal';

const STEPS = {
	DISABLE_E2EE: 'DISABLE_E2EE',
	RESET_ROOM_KEY: 'RESET_ROOM_KEY',
};

export type BaseDisableE2EEModalProps = {
	onConfirm: () => void;
	onClose: () => void;
	roomType: string;
	roomId: string;
	canResetRoomKey: boolean;
};

const BaseDisableE2EEModal = ({ onConfirm, onClose, roomType, roomId, canResetRoomKey }: BaseDisableE2EEModalProps) => {
    /* Implementation Hidden */
};

export default BaseDisableE2EEModal;

```