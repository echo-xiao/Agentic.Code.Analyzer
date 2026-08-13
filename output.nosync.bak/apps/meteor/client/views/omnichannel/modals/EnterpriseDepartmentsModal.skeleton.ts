## File: apps/meteor/client/views/omnichannel/modals/EnterpriseDepartmentsModal.tsx

```typescript
import {
	Button,
	Modal,
	Box,
	ModalHeader,
	ModalHeaderText,
	ModalTagline,
	ModalTitle,
	ModalClose,
	ModalContent,
	ModalHeroImage,
	ModalFooter,
	ModalFooterControllers,
} from '@rocket.chat/fuselage';
import { useOutsideClick } from '@rocket.chat/fuselage-hooks';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useExternalLink } from '../../../hooks/useExternalLink';
import { useCheckoutUrl } from '../../admin/subscription/hooks/useCheckoutUrl';

// TODO: use `GenericModal` instead of creating a new modal from scratch
// This seems a upSell modal for enterprise feature
const EnterpriseDepartmentsModal = ({ closeModal }: { closeModal: () => void }) => {
    /* Implementation Hidden */
};

export default EnterpriseDepartmentsModal;

```