## File: apps/meteor/client/views/room/modals/E2EEModals/DisableE2EEModal.tsx

```typescript
import { Accordion, AccordionItem, Box, Button } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { Trans, useTranslation } from 'react-i18next';

export type DisableE2EEModalProps = {
	onConfirm: () => void;
	onCancel: () => void;
	roomType: string;
	canResetRoomKey: boolean;
	onResetRoomKey: () => void;
};

const DisableE2EEModal = ({ onConfirm, onCancel, roomType, canResetRoomKey, onResetRoomKey }: DisableE2EEModalProps) => {
    /* Implementation Hidden */
};

export default DisableE2EEModal;

```