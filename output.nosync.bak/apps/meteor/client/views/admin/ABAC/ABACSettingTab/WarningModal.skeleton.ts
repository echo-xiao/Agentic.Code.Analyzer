## File: apps/meteor/client/views/admin/ABAC/ABACSettingTab/WarningModal.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useRouter } from '@rocket.chat/ui-contexts';
import { Trans, useTranslation } from 'react-i18next';

export type WarningModalProps = {
	onConfirm: () => void;
	onCancel: () => void;
};

const WarningModal = ({ onConfirm, onCancel }: WarningModalProps) => {
    /* Implementation Hidden */
};

export default WarningModal;

```