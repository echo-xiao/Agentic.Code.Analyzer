## File: packages/gazzodown/src/PreviewMarkup.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';
import { memo } from 'react';

import PreviewCodeBlock from './code/PreviewCodeBlock';
import PreviewInlineElements from './elements/PreviewInlineElements';
import PreviewBigEmojiBlock from './emoji/PreviewBigEmojiBlock';
import KatexErrorBoundary from './katex/KatexErrorBoundary';
import PreviewKatexBlock from './katex/PreviewKatexBlock';

const isOnlyBigEmojiBlock = (tokens: MessageParser.Root): tokens is [MessageParser.BigEmoji] =>
	tokens.length === 1 && tokens[0].type === 'BIG_EMOJI';

export type PreviewMarkupProps = {
	tokens: MessageParser.Root;
	/** Original message source, used to render the `fallback` of blocks without a dedicated renderer. */
	source?: string;
};

const PreviewMarkup = ({ tokens, source }: PreviewMarkupProps) => {
    /* Implementation Hidden */
};

export default memo(PreviewMarkup);

```