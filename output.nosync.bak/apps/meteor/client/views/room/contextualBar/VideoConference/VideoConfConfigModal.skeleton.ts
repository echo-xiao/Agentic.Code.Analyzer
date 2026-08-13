## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfConfigModal.tsx

```typescript
import {
	Modal,
	Button,
	Box,
	Callout,
	Margins,
	ModalHeader,
	ModalHeaderText,
	ModalTagline,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalHeroImage,
	ModalFooter,
	ModalFooterAnnotation,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

export type VideoConfConfigModalProps = {
	onClose: () => void;
	onConfirm?: () => void;
	isAdmin: boolean;
};

const VideoConfConfigModal = ({ onClose, onConfirm, isAdmin }: VideoConfConfigModalProps) => {
    /* Implementation Hidden */
};

export default VideoConfConfigModal;

```