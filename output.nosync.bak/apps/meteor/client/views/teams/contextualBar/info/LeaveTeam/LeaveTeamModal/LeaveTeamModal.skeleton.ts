## File: apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModal.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useState, useCallback, useMemo } from 'react';

import LeaveTeamModalChannels from './LeaveTeamModalChannels';
import LeaveTeamModalConfirmation from './LeaveTeamModalConfirmation';

const LEAVE_TEAM_STEPS = {
	LIST_ROOMS: 'LIST_ROOMS',
	CONFIRM_LEAVE: 'CONFIRM_LEAVE',
} as const;

type LeaveTeamModalProps = {
	rooms: (Serialized<IRoom> & { isLastOwner?: boolean })[];
	onCancel: () => void;
	onConfirm: () => void;
};

const LeaveTeamModal = ({ rooms, onCancel, onConfirm }: LeaveTeamModalProps) => {
    /* Implementation Hidden */
};

export default LeaveTeamModal;

```