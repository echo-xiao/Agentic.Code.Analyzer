## File: apps/meteor/client/views/admin/subscription/components/CancelSubscriptionModal.tsx

```typescript
import { ExternalLink, GenericModal } from '@rocket.chat/ui-client';
import { Trans, useTranslation } from 'react-i18next';

import { DOWNGRADE_LINK } from '../utils/links';

export type CancelSubscriptionModalProps = {
	planName: string;
	onConfirm(): void;
	onCancel(): void;
};

export const CancelSubscriptionModal = ({ planName, onCancel, onConfirm }: CancelSubscriptionModalProps) => {
    /* Implementation Hidden */
};

```