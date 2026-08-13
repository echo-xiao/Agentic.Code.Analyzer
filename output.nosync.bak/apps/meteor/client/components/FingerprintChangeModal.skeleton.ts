## File: apps/meteor/client/components/FingerprintChangeModal.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { ExternalLink, GenericModal } from '@rocket.chat/ui-client';
import { Trans, useTranslation } from 'react-i18next';

import { links } from '../lib/links';

export type FingerprintChangeModalProps = {
	onConfirm: () => void;
	onCancel: () => void;
	onClose: () => void;
};

const FingerprintChangeModal = ({ onConfirm, onCancel, onClose }: FingerprintChangeModalProps) => {
    /* Implementation Hidden */
};

export default FingerprintChangeModal;

```