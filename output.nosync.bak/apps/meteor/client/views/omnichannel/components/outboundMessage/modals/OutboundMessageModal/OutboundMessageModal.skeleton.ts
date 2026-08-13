## File: apps/meteor/client/views/omnichannel/components/outboundMessage/modals/OutboundMessageModal/OutboundMessageModal.tsx

```typescript
import { Modal, ModalBackdrop, ModalClose, ModalContent, ModalHeader, ModalTitle } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useEffect, useId, useState } from 'react';
import type { KeyboardEvent, ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import OutboundMessageCloseConfirmationModal from './OutboundMessageCloseConfirmationModal';
import OutboundMessageWizard from '../../components/OutboundMessageWizard';

export type OutboundMessageModalProps = {
	defaultValues?: ComponentProps<typeof OutboundMessageWizard>['defaultValues'];
	onClose: () => void;
};

const OutboundMessageModal = ({ defaultValues, onClose }: OutboundMessageModalProps) => {
    /* Implementation Hidden */
};

export default OutboundMessageModal;

```