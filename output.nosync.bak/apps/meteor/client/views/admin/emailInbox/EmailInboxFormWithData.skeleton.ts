## File: apps/meteor/client/views/admin/emailInbox/EmailInboxFormWithData.tsx

```typescript
import type { IEmailInbox } from '@rocket.chat/core-typings';
import { States, StatesIcon, StatesTitle } from '@rocket.chat/fuselage';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import EmailInboxForm from './EmailInboxForm';
import { FormSkeleton } from '../../../components/Skeleton';

export type EmailInboxFormWithDataProps = { id: IEmailInbox['_id'] };

const EmailInboxFormWithData = ({ id }: EmailInboxFormWithDataProps) => {
    /* Implementation Hidden */
};

export default EmailInboxFormWithData;

```