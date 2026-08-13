## File: apps/meteor/client/views/marketplace/AppUpdateModal.tsx

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

export type AppUpdateModalProps = {
	confirm: () => void;
	cancel: () => void;
};

const AppUpdateModal = ({ confirm, cancel, ...props }: AppUpdateModalProps) => {
    /* Implementation Hidden */
};

export default AppUpdateModal;

```