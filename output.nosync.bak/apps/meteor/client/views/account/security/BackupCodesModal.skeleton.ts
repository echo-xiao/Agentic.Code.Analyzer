## File: apps/meteor/client/views/account/security/BackupCodesModal.tsx

```typescript
import { Box, CodeSnippet } from '@rocket.chat/fuselage';
import { useClipboard } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type BackupCodesModalProps = {
	codes: string[];
	onClose: () => void;
};

const BackupCodesModal = ({ codes, onClose }: BackupCodesModalProps) => {
    /* Implementation Hidden */
};

export default BackupCodesModal;

```