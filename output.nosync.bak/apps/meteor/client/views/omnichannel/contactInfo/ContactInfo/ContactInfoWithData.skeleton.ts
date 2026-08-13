## File: apps/meteor/client/views/omnichannel/contactInfo/ContactInfo/ContactInfoWithData.tsx

```typescript
import { ContextualbarSkeleton } from '@rocket.chat/ui-client';
import { useEndpoint, usePermission } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import ContactInfoError from '../ContactInfoError';
import ContactInfo from './ContactInfo';

type ContactInfoWithDataProps = {
	id: string;
	onClose: () => void;
};

const ContactInfoWithData = ({ id: contactId, onClose }: ContactInfoWithDataProps) => {
    /* Implementation Hidden */
};

export default ContactInfoWithData;

```