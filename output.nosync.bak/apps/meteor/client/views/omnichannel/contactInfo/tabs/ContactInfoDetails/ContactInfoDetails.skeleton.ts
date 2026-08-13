## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoDetails/ContactInfoDetails.tsx

```typescript
import type { ILivechatContact } from '@rocket.chat/core-typings';
import { Divider, Margins } from '@rocket.chat/fuselage';
import { ContextualbarScrollableContent } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import ContactInfoDetailsEntry from './ContactInfoDetailsEntry';
import ContactInfoPhoneEntry from './ContactInfoPhoneEntry';
import ContactManagerInfo from './ContactManagerInfo';
import { useFormatDate } from '../../../../../hooks/useFormatDate';
import CustomField from '../../../components/CustomField';
import Field from '../../../components/Field';
import Info from '../../../components/Info';
import Label from '../../../components/Label';

type ContactInfoDetailsProps = {
	contact: Pick<ILivechatContact, '_id' | 'unknown'>;
	emails?: string[];
	phones?: string[];
	createdAt: string;
	customFieldEntries: [string, string | unknown][];
	contactManager?: string;
};

const ContactInfoDetails = ({ contact, emails, phones, createdAt, customFieldEntries, contactManager }: ContactInfoDetailsProps) => {
    /* Implementation Hidden */
};

export default ContactInfoDetails;

```