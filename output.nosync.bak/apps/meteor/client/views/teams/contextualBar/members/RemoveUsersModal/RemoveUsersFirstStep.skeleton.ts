## File: apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersFirstStep.tsx

```typescript
import type { Serialized, IRoom } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import ChannelDesertionTable from '../../../ChannelDesertionTable';

type RemoveUsersFirstStepProps = {
	onClose: () => void;
	onCancel: () => void;
	onConfirm: () => void;
	rooms?: (Serialized<IRoom> & { isLastOwner?: boolean })[];
	onToggleAllRooms: () => void;
	onChangeRoomSelection: (room: Serialized<IRoom> & { isLastOwner?: boolean }) => void;
	selectedRooms: { [key: string]: Serialized<IRoom> };
	eligibleRoomsLength: number | undefined;
};

const RemoveUsersFirstStep = ({
	onClose,
	onCancel,
	onConfirm,
	rooms,
	onToggleAllRooms,
	onChangeRoomSelection,
	selectedRooms,
	eligibleRoomsLength,
	...props
}: RemoveUsersFirstStepProps) => {
    /* Implementation Hidden */
};

export default RemoveUsersFirstStep;

```