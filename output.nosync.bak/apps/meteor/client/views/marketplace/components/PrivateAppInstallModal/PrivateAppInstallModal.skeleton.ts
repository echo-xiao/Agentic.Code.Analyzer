## File: apps/meteor/client/views/marketplace/components/PrivateAppInstallModal/PrivateAppInstallModal.tsx

```typescript
import {
	Box,
	Button,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalFooterAnnotation,
	ModalFooterControllers,
	ModalHeader,
	ModalHeaderText,
	ModalTitle,
} from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useExternalLink } from '../../../../hooks/useExternalLink';
import { useCheckoutUrl } from '../../../admin/subscription/hooks/useCheckoutUrl';
import { PRICING_LINK } from '../../../admin/subscription/utils/links';

export type PrivateAppInstallModalProps = {
	onClose: () => void;
	onProceed: () => void;
};

const PrivateAppInstallModal = ({ onClose, onProceed }: PrivateAppInstallModalProps) => {
    /* Implementation Hidden */
};

export default PrivateAppInstallModal;

```