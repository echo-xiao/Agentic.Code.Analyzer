## File: packages/gazzodown/src/blocks/HeadingBlock.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';

import InlineElements from '../elements/InlineElements';

export type HeadingBlockProps = {
	children?: MessageParser.Inlines[];
	level?: 1 | 2 | 3 | 4;
};

const HeadingBlock = ({ children = [], level = 1 }: HeadingBlockProps) => {
    /* Implementation Hidden */
};

export default HeadingBlock;

```