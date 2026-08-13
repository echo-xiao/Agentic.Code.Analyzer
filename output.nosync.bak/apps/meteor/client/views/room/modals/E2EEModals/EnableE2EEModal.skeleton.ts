## File: apps/meteor/client/views/room/modals/E2EEModals/EnableE2EEModal.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

export type EnableE2EEModalProps = {
	onConfirm: () => void;
	onClose: () => void;
	roomType: string;
};

const EnableE2EEModal = ({ onConfirm, onClose, roomType }: EnableE2EEModalProps) => {
    /* Implementation Hidden */
};

export default EnableE2EEModal;

```