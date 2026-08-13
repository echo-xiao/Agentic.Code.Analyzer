## File: apps/meteor/client/views/omnichannel/contactInfo/AdvancedContactModal.tsx

```typescript
import { useRole, useEndpoint } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getURL } from '../../../../app/utils/client/getURL';
import GenericUpsellModal from '../../../components/GenericUpsellModal';
import { useUpsellActions } from '../../../components/GenericUpsellModal/hooks';
import { useExternalLink } from '../../../hooks/useExternalLink';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import { links } from '../../../lib/links';

type AdvancedContactModalProps = {
	onCancel: () => void;
};

const AdvancedContactModal = ({ onCancel }: AdvancedContactModalProps) => {
    /* Implementation Hidden */
};

export default AdvancedContactModal;

```