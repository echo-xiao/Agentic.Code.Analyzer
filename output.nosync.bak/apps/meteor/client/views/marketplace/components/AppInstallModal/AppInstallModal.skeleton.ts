## File: apps/meteor/client/views/marketplace/components/AppInstallModal/AppInstallModal.tsx

```typescript
import {
	Button,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterControllers,
	ModalHeader,
	ModalHeaderText,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../../components/MarkdownText';

type AppsInstallationModalProps = {
	enabled: number;
	limit: number;
	appName: string;
	handleClose: () => void;
	handleConfirm: () => void;
	handleEnableUnlimitedApps: () => void;
};

const AppInstallationModal = ({
	enabled,
	limit,
	appName,
	handleClose,
	handleConfirm,
	handleEnableUnlimitedApps,
}: AppsInstallationModalProps) => {
    /* Implementation Hidden */
};

export default AppInstallationModal;

```