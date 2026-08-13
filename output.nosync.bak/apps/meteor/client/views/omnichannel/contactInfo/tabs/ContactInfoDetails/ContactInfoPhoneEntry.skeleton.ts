## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoDetails/ContactInfoPhoneEntry.tsx

```typescript
import type { ILivechatContact } from '@rocket.chat/core-typings';
import { IconButton } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import ContactInfoDetailsEntry from './ContactInfoDetailsEntry';
import ContactInfoOutboundMessageButton from './ContactInfoOutboundMessageButton';
import useClipboardWithToast from '../../../../../hooks/useClipboardWithToast';
import { parseOutboundPhoneNumber } from '../../../../../lib/voip/parseOutboundPhoneNumber';

type ContactInfoPhoneEntryProps = Omit<ComponentProps<typeof ContactInfoDetailsEntry>, 'icon' | 'actions'> & {
	contact?: Pick<ILivechatContact, '_id' | 'unknown'>;
};

const ContactInfoPhoneEntry = ({ contact, value, ...props }: ContactInfoPhoneEntryProps) => {
    /* Implementation Hidden */
};

export default ContactInfoPhoneEntry;

```