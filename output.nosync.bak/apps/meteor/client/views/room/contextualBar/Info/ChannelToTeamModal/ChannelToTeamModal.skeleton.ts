## File: apps/meteor/client/views/room/contextualBar/Info/ChannelToTeamModal/ChannelToTeamModal.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useState } from 'react';

import ChannelToTeamConfirmation from './ChannelToTeamConfirmation';
import ChannelToTeamSelection from './ChannelToTeamSelection';

type ChannelToTeamModalProps = {
	onCancel: () => void;
	onConfirm: (teamId: IRoom['_id']) => void;
};

const CHANNEL_TO_TEAM_STEPS = {
	SELECTION: 'selection',
	CONFIRMATION: 'confirmation',
};

const ChannelToTeamModal = ({ onCancel, onConfirm }: ChannelToTeamModalProps) => {
    /* Implementation Hidden */
};

export default ChannelToTeamModal;

```