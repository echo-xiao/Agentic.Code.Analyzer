## File: apps/meteor/client/components/FingerprintChangeModalConfirmation.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { ExternalLink, GenericModal } from '@rocket.chat/ui-client';
import { Trans, useTranslation } from 'react-i18next';

import { links } from '../lib/links';

export type FingerprintChangeModalConfirmationProps = {
	onConfirm: () => void;
	onCancel: () => void;
	onClose: () => void;
	newWorkspace: boolean;
};

const FingerprintChangeModalConfirmation = ({ onConfirm, onCancel, onClose, newWorkspace }: FingerprintChangeModalConfirmationProps) => {
    /* Implementation Hidden */
};

export default FingerprintChangeModalConfirmation;

```