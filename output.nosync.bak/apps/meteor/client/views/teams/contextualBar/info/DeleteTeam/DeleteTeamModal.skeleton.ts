## File: apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModal.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useState } from 'react';

import DeleteTeamChannels from './DeleteTeamChannels';
import DeleteTeamConfirmation from './DeleteTeamConfirmation';

const STEPS = { LIST_ROOMS: 'LIST_ROOMS', CONFIRM_DELETE: 'CONFIRM_DELETE' };

type DeleteTeamModalProps = {
	onCancel: () => void;
	onConfirm: (roomsToDelete: IRoom['_id'][]) => void;
	rooms: Serialized<IRoom>[];
};

const DeleteTeamModal = ({ onCancel, onConfirm, rooms }: DeleteTeamModalProps) => {
    /* Implementation Hidden */
};

export default DeleteTeamModal;

```