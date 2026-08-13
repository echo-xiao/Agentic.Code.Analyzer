## File: apps/meteor/client/views/admin/workspace/VersionCard/modals/RegisterWorkspaceModal.tsx

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
import { ExternalLink } from '@rocket.chat/ui-client';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import RegisterWorkspaceSetupModal from './RegisterWorkspaceSetupModal';
import RegisterWorkspaceTokenModal from './RegisterWorkspaceTokenModal';
import { links } from '../../../../../lib/links';
import useFeatureBullets from '../hooks/useFeatureBullets';

export type RegisterWorkspaceModalProps = {
	onClose: () => void;
	onStatusChange?: () => void;
};

const documentationLink = links.go.registerInfoCollected;

const RegisterWorkspaceModal = ({ onClose, onStatusChange, ...props }: RegisterWorkspaceModalProps) => {
    /* Implementation Hidden */
};

export default RegisterWorkspaceModal;

```