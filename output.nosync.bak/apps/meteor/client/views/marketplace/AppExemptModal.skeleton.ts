## File: apps/meteor/client/views/marketplace/AppExemptModal.tsx

```typescript
import { Box, ModalFooterAnnotation } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useExternalLink } from '../../hooks/useExternalLink';
import { useCheckoutUrl } from '../admin/subscription/hooks/useCheckoutUrl';
import { PRICING_LINK } from '../admin/subscription/utils/links';

export type AppExemptModalProps = {
	onCancel: () => void;
	appName: string;
};

const AppExemptModal = ({ onCancel, appName }: AppExemptModalProps) => {
    /* Implementation Hidden */
};

export default AppExemptModal;

```