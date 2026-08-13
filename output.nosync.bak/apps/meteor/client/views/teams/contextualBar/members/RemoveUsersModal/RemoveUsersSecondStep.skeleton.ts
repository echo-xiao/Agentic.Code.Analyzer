## File: apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersSecondStep.tsx

```typescript
import type { Serialized, IRoom } from '@rocket.chat/core-typings';
import { Icon } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

type RemoveUsersSecondStepProps = {
	onClose: () => void;
	onCancel: () => void;
	onConfirm: (deletedRooms: { [key: string]: Serialized<IRoom> }) => void;
	deletedRooms: {
		[key: string]: Serialized<IRoom>;
	};
	rooms?: { _id: string; t: string; name?: string; fname?: string; isLastOwner?: boolean }[];
	username?: string;
};

const RemoveUsersSecondStep = ({
	onClose,
	onCancel,
	onConfirm,
	deletedRooms = {},
	username,
	rooms = [],
	...props
}: RemoveUsersSecondStepProps) => {
    /* Implementation Hidden */
};

export default RemoveUsersSecondStep;

```