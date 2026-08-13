## File: apps/meteor/client/views/marketplace/AppsList/AddonRequiredModal.tsx

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

import { useExternalLink } from '../../../hooks/useExternalLink';
import { GET_ADDONS_LINK } from '../../admin/subscription/utils/links';

export type AddonActionType = 'install' | 'enable' | 'update';

export type AddonRequiredModalProps = {
	actionType: AddonActionType;
	onDismiss: () => void;
	onInstallAnyway: () => void;
};

const AddonRequiredModal = ({ actionType, onDismiss, onInstallAnyway }: AddonRequiredModalProps) => {
    /* Implementation Hidden */
};

export default AddonRequiredModal;

```