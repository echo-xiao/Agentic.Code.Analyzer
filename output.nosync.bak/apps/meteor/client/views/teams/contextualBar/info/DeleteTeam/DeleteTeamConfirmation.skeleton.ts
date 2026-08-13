## File: apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamConfirmation.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import RoomLinkList from './RoomLinkList';

type DeleteTeamConfirmationProps = {
	deletedRooms: { [key: string]: Serialized<IRoom> };
	keptRooms: { [key: string]: Serialized<IRoom> };
	onConfirm: (roomsToDelete: IRoom['_id'][]) => void;
	onReturn?: () => void;
	onCancel: () => void;
};

const DeleteTeamConfirmation = ({ deletedRooms, keptRooms, onConfirm, onReturn, onCancel }: DeleteTeamConfirmationProps) => {
    /* Implementation Hidden */
};

export default DeleteTeamConfirmation;

```