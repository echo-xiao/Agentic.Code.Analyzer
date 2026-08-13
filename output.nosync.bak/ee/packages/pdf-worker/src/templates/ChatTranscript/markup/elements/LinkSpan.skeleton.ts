## File: ee/packages/pdf-worker/src/templates/ChatTranscript/markup/elements/LinkSpan.tsx

```typescript
import { View, Text } from '@react-pdf/renderer';
import type * as MessageParser from '@rocket.chat/message-parser';
import { useMemo } from 'react';

import BoldSpan from './BoldSpan';
import ItalicSpan from './ItalicSpan';
import StrikeSpan from './StrikeSpan';

export type LinkSpanProps = {
	label: MessageParser.Markup | MessageParser.Markup[];
};

const LinkSpan = ({ label }: LinkSpanProps) => {
    /* Implementation Hidden */
};

export default LinkSpan;

```