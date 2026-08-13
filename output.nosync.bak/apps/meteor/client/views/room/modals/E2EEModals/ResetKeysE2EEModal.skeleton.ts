## File: apps/meteor/client/views/room/modals/E2EEModals/ResetKeysE2EEModal.tsx

```typescript
import { Box, ModalFooterAnnotation, ModalIcon } from '@rocket.chat/fuselage';
import { ExternalLink, GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { Trans, useTranslation } from 'react-i18next';

import { links } from '../../../../lib/links';
import { useE2EEResetRoomKey } from '../../hooks/useE2EEResetRoomKey';

const E2EE_RESET_KEY_LINK = links.go.e2eeGuide;

export type ResetKeysE2EEModalProps = {
	roomType: string;
	roomId: string;
	onCancel: () => void;
};

const ResetKeysE2EEModal = ({ roomType, roomId, onCancel }: ResetKeysE2EEModalProps) => {
    /* Implementation Hidden */
};

export default ResetKeysE2EEModal;

```