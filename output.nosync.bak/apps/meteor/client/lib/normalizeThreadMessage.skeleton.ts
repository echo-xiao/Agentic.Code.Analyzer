## File: apps/meteor/client/lib/normalizeThreadMessage.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Markup } from '@rocket.chat/gazzodown';
import { parse } from '@rocket.chat/message-parser';

import { filterMarkdown } from '../../app/markdown/lib/markdown';
import GazzodownText from '../components/GazzodownText';

export function normalizeThreadMessage({ ...message }: Readonly<Pick<IMessage, 'msg' | 'mentions' | 'attachments'>>) {
    /* Implementation Hidden */
}

```