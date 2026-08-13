## File: packages/gazzodown/src/mentions/PreviewChannelMentionElement.tsx

```typescript
import { memo } from 'react';

export type PreviewChannelMentionElementProps = {
	mention: string;
};

const PreviewChannelMentionElement = ({ mention }: PreviewChannelMentionElementProps) => <>#{mention}</>;

export default memo(PreviewChannelMentionElement);

```