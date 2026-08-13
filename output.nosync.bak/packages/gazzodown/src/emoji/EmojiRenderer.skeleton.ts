## File: packages/gazzodown/src/emoji/EmojiRenderer.tsx

```typescript
import { MessageEmoji, ThreadMessageEmoji } from '@rocket.chat/fuselage';
import type * as MessageParser from '@rocket.chat/message-parser';
import DOMPurify from 'dompurify';
import { useMemo, useContext, memo } from 'react';

import { MarkupInteractionContext } from '../MarkupInteractionContext';

type EmojiProps = MessageParser.Emoji & {
	big?: boolean;
	preview?: boolean;
};

const EmojiRenderer = ({ big = false, preview = false, ...emoji }: EmojiProps) => {
    /* Implementation Hidden */
};

export default memo(EmojiRenderer);

```