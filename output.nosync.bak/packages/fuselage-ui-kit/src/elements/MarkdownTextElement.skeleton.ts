## File: packages/fuselage-ui-kit/src/elements/MarkdownTextElement.tsx

```typescript
import { Skeleton } from '@rocket.chat/fuselage';
import { Markup } from '@rocket.chat/gazzodown';
import { parse } from '@rocket.chat/message-parser';
import type { TextObject } from '@rocket.chat/ui-kit';
import { Suspense } from 'react';

import { useAppTranslation } from '../hooks/useAppTranslation';

export type MarkdownTextElementProps = { textObject: TextObject };

const MarkdownTextElement = ({ textObject }: MarkdownTextElementProps) => {
    /* Implementation Hidden */
};

export default MarkdownTextElement;

```