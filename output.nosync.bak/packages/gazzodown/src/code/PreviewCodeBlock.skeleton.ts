## File: packages/gazzodown/src/code/PreviewCodeBlock.tsx

```typescript
import type * as MessageParser from '@rocket.chat/message-parser';
import { useMemo } from 'react';

export type PreviewCodeBlockProps = {
	language?: string;
	lines: MessageParser.CodeLine[];
};

export const PreviewCodeBlock = ({ lines }: PreviewCodeBlockProps) => {
    /* Implementation Hidden */
};

export default PreviewCodeBlock;

```