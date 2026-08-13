## File: apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamModal/LeaveTeamModalConfirmation.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

type LeaveTeamModalConfirmationProps = {
	onConfirm: (selectedRooms?: { [key: string]: Serialized<IRoom> & { isLastOwner?: boolean } }) => void;
	onClose: () => void;
	onCancel?: () => void;
	selectedRooms: {
		[key: string]: Serialized<IRoom> & { isLastOwner?: boolean };
	};
};

const LeaveTeamModalConfirmation = ({ selectedRooms, onConfirm, onCancel, onClose }: LeaveTeamModalConfirmationProps) => {
    /* Implementation Hidden */
};

export default LeaveTeamModalConfirmation;

```