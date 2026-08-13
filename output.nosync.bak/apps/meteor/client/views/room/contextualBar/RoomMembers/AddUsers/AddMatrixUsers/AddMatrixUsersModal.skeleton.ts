## File: apps/meteor/client/views/room/contextualBar/RoomMembers/AddUsers/AddMatrixUsers/AddMatrixUsersModal.tsx

```typescript
import {
	Modal,
	Button,
	Box,
	Icon,
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
import type { ComponentProps } from 'react';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type AddMatrixUsersModalProps = {
	matrixIdVerifiedStatus: Map<string, string>;
	completeUserList: string[];
	onClose: () => void;
	onSave: (args_0: { users: string[]; unbanConfirmed?: boolean }) => Promise<void>;
};

type FormValues = {
	usersToInvite: string[];
};

const verificationStatusAsIcon = (verificationStatus: string): ComponentProps<typeof Icon>['name'] => {
    /* Implementation Hidden */
};

const AddMatrixUsersModal = ({ onClose, matrixIdVerifiedStatus, onSave, completeUserList }: AddMatrixUsersModalProps) => {
    /* Implementation Hidden */
};

export default AddMatrixUsersModal;

```