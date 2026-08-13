## File: apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/ModalSteps/SecondStep.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Icon } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

type SecondStepsProps = {
	onClose: () => void;
	onCancel: () => void;
	onConfirm: (deletedRooms: { [key: string]: Serialized<IRoom> }) => void;
	deletedRooms: {
		[key: string]: Serialized<IRoom>;
	};
	rooms?: (Serialized<IRoom> & { isLastOwner?: boolean })[];
};

const SecondStep = ({ onClose, onCancel, onConfirm, deletedRooms = {}, rooms = [], ...props }: SecondStepsProps) => {
    /* Implementation Hidden */
};

export default SecondStep;

```