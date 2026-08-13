## File: apps/meteor/client/views/room/modals/PinMessageModal/PinMessageModal.tsx

```typescript
import type { MessageQuoteAttachment, IMessage } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { useUserDisplayName, GenericModal } from '@rocket.chat/ui-client';
import { useTranslation, useUserAvatarPath } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';

import { QuoteAttachment } from '../../../../components/message/content/attachments/QuoteAttachment';
import AttachmentProvider from '../../../../providers/AttachmentProvider';

export type PinMessageModalProps = { message: IMessage } & ComponentProps<typeof GenericModal>;

const PinMessageModal = ({ message, ...props }: PinMessageModalProps) => {
    /* Implementation Hidden */
};

export default PinMessageModal;

```