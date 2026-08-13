## File: apps/meteor/client/views/room/webdav/AddWebdavAccountModal.tsx

```typescript
import type { IWebdavAccountPayload } from '@rocket.chat/core-typings';
import {
	Modal,
	Field,
	FieldGroup,
	FieldLabel,
	FieldRow,
	FieldError,
	TextInput,
	PasswordInput,
	Button,
	Box,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { useToastMessageDispatch, useMethod } from '@rocket.chat/ui-contexts';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type AddWebdavAccountModalPayload = IWebdavAccountPayload;

type AddWebdavAccountModalProps = {
	onClose: () => void;
	onConfirm: () => void;
};

const AddWebdavAccountModal = ({ onClose, onConfirm }: AddWebdavAccountModalProps) => {
    /* Implementation Hidden */
};

export default AddWebdavAccountModal;

```