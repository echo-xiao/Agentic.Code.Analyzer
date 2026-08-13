## File: packages/gazzodown/src/mentions/PreviewUserMentionElement.tsx

```typescript
import { memo } from 'react';

export type PreviewUserMentionElementProps = {
	mention: string;
};

const PreviewUserMentionElement = ({ mention }: PreviewUserMentionElementProps) => <>@{mention}</>;

export default memo(PreviewUserMentionElement);

```