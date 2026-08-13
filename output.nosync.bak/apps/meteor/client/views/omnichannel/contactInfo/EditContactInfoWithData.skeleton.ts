## File: apps/meteor/client/views/omnichannel/contactInfo/EditContactInfoWithData.tsx

```typescript
import { ContextualbarSkeleton } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import ContactInfoError from './ContactInfoError';
import EditContactInfo from './EditContactInfo';

type EditContactInfoWithDataProps = {
	id: string;
	onClose: () => void;
	onCancel: () => void;
};

const EditContactInfoWithData = ({ id, onClose, onCancel }: EditContactInfoWithDataProps) => {
    /* Implementation Hidden */
};

export default EditContactInfoWithData;

```