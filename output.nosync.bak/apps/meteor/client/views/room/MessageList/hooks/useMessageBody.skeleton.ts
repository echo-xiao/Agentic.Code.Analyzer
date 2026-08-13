## File: apps/meteor/client/views/room/MessageList/hooks/useMessageBody.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import type { Options, Root } from '@rocket.chat/message-parser';
import { useMemo } from 'react';

import { useAutoLinkDomains } from './useAutoLinkDomains';
import { useMessageListAutoTranslate } from '../../../../components/message/list/MessageListContext';
import { parseMessageTextToAstMarkdown } from '../../../../lib/parseMessageTextToAstMarkdown';

export const useMessageBody = (message: IMessage | undefined): string | Root => {
    /* Implementation Hidden */
};

```