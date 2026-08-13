## File: apps/meteor/client/components/UrlChangeModal.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';

export type UrlChangeModalProps = {
	onConfirm: () => void;
	siteUrl: string;
	currentUrl: string;
	onClose: () => void;
};

const UrlChangeModal = ({ onConfirm, siteUrl, currentUrl, onClose }: UrlChangeModalProps) => {
    /* Implementation Hidden */
};

export default UrlChangeModal;

```