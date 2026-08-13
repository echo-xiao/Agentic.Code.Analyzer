## File: apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModalChannels.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import ChannelDesertionTable from '../../../../ChannelDesertionTable';

type LeaveTeamModalChannelsProps = {
	rooms?: (Serialized<IRoom> & { isLastOwner?: boolean })[];
	onToggleAllRooms: () => void;
	onChangeRoomSelection: (room: Serialized<IRoom> & { isLastOwner?: boolean }) => void;
	onConfirm: () => void;
	onCancel: () => void;
	eligibleRoomsLength: number;
	selectedRooms: {
		[key: string]: Serialized<IRoom> & { isLastOwner?: boolean };
	};
};

const LeaveTeamModalChannels = ({
	rooms,
	onToggleAllRooms,
	onChangeRoomSelection,
	onConfirm,
	onCancel,
	eligibleRoomsLength,
	selectedRooms,
}: LeaveTeamModalChannelsProps) => {
    /* Implementation Hidden */
};

export default LeaveTeamModalChannels;

```