## File: apps/meteor/client/components/message/content/attachments/structure/AttachmentAuthor.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

export type AttachmentAuthorProps = ComponentPropsWithoutRef<typeof Box>;

const AttachmentAuthor = (props: AttachmentAuthorProps) => (
	<Box display='flex' flexDirection='row' alignItems='center' mbe={4} {...props} />
);

export default AttachmentAuthor;

```