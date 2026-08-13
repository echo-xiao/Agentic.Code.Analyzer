## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxReply.tsx

```typescript
import type { IMessage, MessageQuoteAttachment } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { IconButton, Box, Margins } from '@rocket.chat/fuselage';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { QuoteAttachment } from '../../../../components/message/content/attachments/QuoteAttachment';
import AttachmentProvider from '../../../../providers/AttachmentProvider';
import { useChat } from '../../contexts/ChatContext';

const MessageBoxReply = ({ reply }: { reply: IMessage }) => {
    /* Implementation Hidden */
};

export default memo(MessageBoxReply);

```