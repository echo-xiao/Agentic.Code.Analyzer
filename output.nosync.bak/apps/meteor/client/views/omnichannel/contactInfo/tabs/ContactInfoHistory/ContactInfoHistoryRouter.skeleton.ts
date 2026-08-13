## File: apps/meteor/client/views/omnichannel/contactInfo/tabs/ContactInfoHistory/ContactInfoHistoryRouter.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useState } from 'react';

import ContactInfoHistory from './ContactInfoHistory';
import ContactInfoHistoryMessages from './ContactInfoHistoryMessages';

const ContactInfoHistoryRouter = ({ contact }: { contact: Serialized<ILivechatContact> }) => {
    /* Implementation Hidden */
};

export default ContactInfoHistoryRouter;

```