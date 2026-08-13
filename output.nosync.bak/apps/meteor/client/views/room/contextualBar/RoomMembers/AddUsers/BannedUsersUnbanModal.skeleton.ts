## File: apps/meteor/client/views/room/contextualBar/RoomMembers/AddUsers/BannedUsersUnbanModal.tsx

```typescript
import {
	Modal,
	Box,
	Button,
	Label,
	CheckBox,
	ModalHeader,
	ModalHeaderText,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterAnnotation,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

type BannedUsersUnbanModalProps = {
	onClose: () => void;
	onConfirm: () => Promise<void>;
};

const BannedUsersUnbanModal = ({ onClose, onConfirm }: BannedUsersUnbanModalProps) => {
    /* Implementation Hidden */
};

export default BannedUsersUnbanModal;

```