## File: packages/livechat/src/components/MarkdownBlock/index.tsx

```typescript
import { parse } from '@rocket.chat/message-parser';
import { Suspense, lazy } from 'preact/compat';

const Markup = lazy(() => import('@rocket.chat/gazzodown/dist/Markup'));

const MarkdownBlock = ({ text, emoticons }: { text: string; emoticons?: boolean }) => {
    /* Implementation Hidden */
};

export default MarkdownBlock;

```