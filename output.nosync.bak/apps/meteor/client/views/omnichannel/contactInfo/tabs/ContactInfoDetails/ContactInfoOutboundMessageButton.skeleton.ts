## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoDetails/ContactInfoOutboundMessageButton.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useOutboundMessageAccess } from '../../../components/outboundMessage/hooks';
import type { OutboundMessageModalProps } from '../../../components/outboundMessage/modals/OutboundMessageModal';
import { useOutboundMessageModal } from '../../../components/outboundMessage/modals/OutboundMessageModal';

type ContactInfoOutboundMessageButtonProps = {
	title?: string;
	disabled?: boolean;
	defaultValues?: OutboundMessageModalProps['defaultValues'];
};

const ContactInfoOutboundMessageButton = ({ defaultValues, disabled, title }: ContactInfoOutboundMessageButtonProps) => {
    /* Implementation Hidden */
};

export default ContactInfoOutboundMessageButton;

```