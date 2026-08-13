## File: apps/meteor/client/components/message/content/Attachments.tsx

```typescript
import type { MessageAttachmentBase } from '@rocket.chat/core-typings';

import AttachmentsItem from './attachments/AttachmentsItem';
import type { AudioAttachmentSource } from './attachments/file/AudioAttachment';

export type AttachmentsProps = {
	attachments: MessageAttachmentBase[];
	id?: string | undefined;
	source?: AudioAttachmentSource;
};

const Attachments = ({ attachments, id, source }: AttachmentsProps) => {
    /* Implementation Hidden */
};

export default Attachments;

```