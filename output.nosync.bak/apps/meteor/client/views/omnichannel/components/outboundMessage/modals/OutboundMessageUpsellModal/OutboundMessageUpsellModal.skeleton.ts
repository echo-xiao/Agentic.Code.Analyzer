## File: apps/meteor/client/views/omnichannel/components/outboundMessage/modals/OutboundMessageUpsellModal/OutboundMessageUpsellModal.tsx

```typescript
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getURL } from '../../../../../../../app/utils/client';
import GenericUpsellModal from '../../../../../../components/GenericUpsellModal';
import { useExternalLink } from '../../../../../../hooks/useExternalLink';
import { CONTACT_SALES_LINK, OUTBOUND_DOCS_LINK } from '../../constants';

type OutboundMessageUpsellModalProps = {
	hasModule?: boolean;
	isAdmin?: boolean;
	isCommunity?: boolean;
	onClose: () => void;
};

const OutboundMessageUpsellModal = ({ isCommunity, hasModule, isAdmin, onClose }: OutboundMessageUpsellModalProps) => {
    /* Implementation Hidden */
};

export default OutboundMessageUpsellModal;

```