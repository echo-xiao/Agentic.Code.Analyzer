## File: apps/meteor/app/livechat-enterprise/client/components/modals/PlaceChatOnHoldModal.tsx

```typescript
import {
	Button,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
	ModalHeader,
	ModalIcon,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

export type PlaceChatOnHoldModalProps = {
	onOnHoldChat: () => void;
	confirm?: () => void;
	onCancel: () => void;
};

const PlaceChatOnHoldModal = ({ onCancel, onOnHoldChat, confirm = onOnHoldChat, ...props }: PlaceChatOnHoldModalProps) => {
    /* Implementation Hidden */
};

export default PlaceChatOnHoldModal;

```