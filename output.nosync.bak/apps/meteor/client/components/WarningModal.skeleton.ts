## File: apps/meteor/client/components/WarningModal.tsx

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
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type WarningModalProps = {
	text: ReactNode;
	confirmText: ReactNode;
	cancelText?: ReactNode;
	confirm: () => void;
	cancel?: () => void;
	close: () => void;
};

const WarningModal = ({ text, confirmText, close, cancel, cancelText, confirm, ...props }: WarningModalProps) => {
    /* Implementation Hidden */
};

export default WarningModal;

```