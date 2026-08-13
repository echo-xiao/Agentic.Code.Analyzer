## File: apps/meteor/client/components/message/MessageContentBody.tsx

```typescript
import { MessageBody, Skeleton } from '@rocket.chat/fuselage';
import { Markup } from '@rocket.chat/gazzodown';
import type { ComponentProps } from 'react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import type { MessageWithMdEnforced } from '../../lib/parseMessageTextToAstMarkdown';
import GazzodownText from '../GazzodownText';

export type MessageContentBodyProps = Pick<MessageWithMdEnforced, 'mentions' | 'channels' | 'md'> & {
	/** Original source text the `md` was parsed from; used to render the fallback of unsupported blocks. */
	msg?: string;
	searchText?: string;
} & ComponentProps<typeof MessageBody>;

const MessageContentBody = ({ mentions, channels, md, msg, searchText, ...props }: MessageContentBodyProps) => {
    /* Implementation Hidden */
};

export default MessageContentBody;

```