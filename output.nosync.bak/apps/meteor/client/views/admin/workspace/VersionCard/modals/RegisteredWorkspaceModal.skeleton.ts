## File: apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisteredWorkspaceModal.tsx

```typescript
import {
	Box,
	Button,
	ButtonGroup,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalHeaderText,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useFeatureBullets from '../hooks/useFeatureBullets';

export type RegisteredWorkspaceModalProps = {
	onClose: () => void;
	onStatusChange?: () => void;
};

const RegisteredWorkspaceModal = ({ onClose, onStatusChange, ...props }: RegisteredWorkspaceModalProps) => {
    /* Implementation Hidden */
};

export default RegisteredWorkspaceModal;

```