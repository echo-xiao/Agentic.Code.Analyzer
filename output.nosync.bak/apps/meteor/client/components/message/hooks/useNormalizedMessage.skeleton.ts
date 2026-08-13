## File: apps/meteor/client/components/message/hooks/useNormalizedMessage.ts

```typescript
import { Base64 } from '@rocket.chat/base64';
import type { IMessage, MessageAttachment } from '@rocket.chat/core-typings';
import {
	isFileImageAttachment,
	isFileAttachment,
	isFileAudioAttachment,
	isFileVideoAttachment,
	isQuoteAttachment,
} from '@rocket.chat/core-typings';
import type { Options } from '@rocket.chat/message-parser';
import { useMemo } from 'react';

import type { MessageWithMdEnforced } from '../../../lib/parseMessageTextToAstMarkdown';
import { parseMessageTextToAstMarkdown } from '../../../lib/parseMessageTextToAstMarkdown';
import { useAutoLinkDomains } from '../../../views/room/MessageList/hooks/useAutoLinkDomains';
import { useMessageListAutoTranslate, useMessageListKatex, useMessageListShowColors } from '../list/MessageListContext';

const normalizeAttachments = (attachments: MessageAttachment[], name?: string, type?: string): MessageAttachment[] => {
    /* Implementation Hidden */
};

export const useNormalizedMessage = <TMessage extends IMessage>(message: TMessage): MessageWithMdEnforced => {
    /* Implementation Hidden */
};

```