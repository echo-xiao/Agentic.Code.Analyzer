## File: apps/meteor/client/views/room/modals/FileUploadModal/FileUploadModal.tsx

```typescript
import {
	Modal,
	Box,
	Button,
	ModalHeader,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import {
	TextInput,
	TextAreaInput,
	Field,
	FieldError,
	FieldRow,
	FieldLabel,
	FieldGroup,
	FieldDescription,
} from '@rocket.chat/fuselage-forms';
import type { ComponentProps } from 'react';
import { memo, useCallback, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import FilePreview from './FilePreview';
import { fileUploadIsValidContentType } from '../../../../../app/utils/client/restrictions';
import { getMimeTypeFromFileName } from '../../../../../app/utils/lib/mimeTypes';

export type FileUploadModalProps = {
	onClose: () => void;
	onSubmit: (name: string, altText?: string) => void;
	file: File;
	fileName: string;
	fileAltText?: string;
};

const FileUploadModal = ({ onClose, file, fileName, fileAltText = '', onSubmit }: FileUploadModalProps) => {
    /* Implementation Hidden */
};

export default memo(FileUploadModal);

```