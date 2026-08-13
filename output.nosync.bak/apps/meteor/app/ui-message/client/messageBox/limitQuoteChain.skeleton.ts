## File: apps/meteor/app/ui-message/client/messageBox/limitQuoteChain.ts

```typescript
import { isQuoteAttachment } from '@rocket.chat/core-typings';
import type { IMessage, MessageAttachment, AtLeast } from '@rocket.chat/core-typings';

// Observation:
// Currently, if the limit is 0, one quote is still allowed.
// This behavior is defined in the server side, so to keep things consistent, we'll keep it that way.
// See @createAttachmentForMessageURLs in @BeforeSaveJumpToMessage.ts
export const limitQuoteChain = <TMessage extends AtLeast<IMessage, 'attachments'>>(message: TMessage, limit = 2): TMessage => {
    /* Implementation Hidden */
};

const traverseMessageQuoteChain = (attachments: MessageAttachment[], limit: number, currentLevel = 1): MessageAttachment[] => {
    /* Implementation Hidden */
};

```