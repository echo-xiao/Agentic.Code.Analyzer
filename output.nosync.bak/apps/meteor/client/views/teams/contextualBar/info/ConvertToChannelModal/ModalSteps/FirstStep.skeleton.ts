## File: apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/ModalSteps/FirstStep.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import ChannelDesertionTable from '../../../../ChannelDesertionTable';

type FirstStepProps = {
	onClose: () => void;
	onCancel: () => void;
	onConfirm: () => void;
	onToggleAllRooms: () => void;
	onChangeRoomSelection: (room: Serialized<IRoom>) => void;
	rooms?: (Serialized<IRoom> & { isLastOwner?: boolean })[];
	eligibleRoomsLength: number | undefined;
	selectedRooms: { [key: string]: Serialized<IRoom> };
};

const FirstStep = ({
	onClose,
	onCancel,
	onConfirm,
	rooms,
	onToggleAllRooms,
	onChangeRoomSelection,
	selectedRooms,
	eligibleRoomsLength,
	...props
}: FirstStepProps) => {
    /* Implementation Hidden */
};

export default FirstStep;

```