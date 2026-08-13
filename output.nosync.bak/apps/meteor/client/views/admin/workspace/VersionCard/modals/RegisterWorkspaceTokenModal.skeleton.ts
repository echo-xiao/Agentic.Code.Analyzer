## File: apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceTokenModal.tsx

```typescript
import {
	Box,
	Button,
	ButtonGroup,
	Field,
	FieldLabel,
	FieldRow,
	FieldError,
	Modal,
	TextInput,
	ModalHeader,
	ModalHeaderText,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalFooter,
} from '@rocket.chat/fuselage';
import { useMethod, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import WorkspaceRegistrationModal from './RegisterWorkspaceModal';

export type RegisterWorkspaceTokenModalProps = {
	onClose: () => void;
	onStatusChange?: () => void;
};

const RegisterWorkspaceTokenModal = ({ onClose, onStatusChange, ...props }: RegisterWorkspaceTokenModalProps) => {
    /* Implementation Hidden */
};

export default RegisterWorkspaceTokenModal;

```