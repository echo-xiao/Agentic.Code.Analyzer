## File: apps/meteor/client/views/omnichannel/components/outboundMessage/modals/OutboundMessageModal/OutboundMessageCloseConfirmationModal.tsx

```typescript
import {
	Button,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterAnnotation,
	ModalFooterControllers,
	ModalHeader,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

type OutboundMessageCloseConfirmationModalProps = {
	onConfirm(): void;
	onCancel(): void;
};

const OutboundMessageCloseConfirmationModal = ({ onConfirm, onCancel }: OutboundMessageCloseConfirmationModalProps) => {
    /* Implementation Hidden */
};

export default OutboundMessageCloseConfirmationModal;

```