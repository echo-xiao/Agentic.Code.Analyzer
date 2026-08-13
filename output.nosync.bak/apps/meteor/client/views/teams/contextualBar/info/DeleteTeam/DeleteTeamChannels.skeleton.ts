## File: apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamChannels.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import ChannelDeletionTable from './ChannelDeletionTable';

type DeleteTeamChannelsProps = {
	rooms: Serialized<IRoom>[];
	onCancel: () => void;
	selectedRooms: { [key: string]: Serialized<IRoom> };
	onToggleAllRooms: () => void;
	onConfirm: () => void;
	onChangeRoomSelection: (room: Serialized<IRoom>) => void;
};

const DeleteTeamChannels = ({
	rooms,
	onCancel,
	selectedRooms,
	onToggleAllRooms,
	onConfirm,
	onChangeRoomSelection,
}: DeleteTeamChannelsProps) => {
    /* Implementation Hidden */
};

export default DeleteTeamChannels;

```