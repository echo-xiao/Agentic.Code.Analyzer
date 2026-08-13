## File: apps/meteor/client/views/account/preferences/MyDataModal.tsx

```typescript
import {
	Button,
	Box,
	Modal,
	ModalHeader,
	ModalIcon,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type MyDataModalProps = {
	onCancel: () => void;
	title: string;
	text?: ReactNode;
};

const MyDataModal = ({ onCancel, title, text, ...props }: MyDataModalProps) => {
    /* Implementation Hidden */
};

export default MyDataModal;

```