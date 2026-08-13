## File: apps/meteor/client/views/admin/emailInbox/SendTestButton.tsx

```typescript
import type { IEmailInboxPayload } from '@rocket.chat/core-typings';
import { Button } from '@rocket.chat/fuselage';
import { GenericTableCell } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

export type SendTestButtonProps = { id: IEmailInboxPayload['_id'] };

const SendTestButton = ({ id }: SendTestButtonProps) => {
    /* Implementation Hidden */
};

export default SendTestButton;

```