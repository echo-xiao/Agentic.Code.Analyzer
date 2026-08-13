## File: packages/gazzodown/src/emoji/Emoji.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';
import { useMemo, useContext, memo } from 'react';

import { MarkupInteractionContext } from '../MarkupInteractionContext';
import EmojiRenderer from './EmojiRenderer';
import PlainSpan from '../elements/PlainSpan';

export type EmojiProps = MessageParser.Emoji & {
	big?: boolean;
	preview?: boolean;
};

const Emoji = ({ big = false, preview = false, ...emoji }: EmojiProps) => {
    /* Implementation Hidden */
};

export default memo(Emoji);

```