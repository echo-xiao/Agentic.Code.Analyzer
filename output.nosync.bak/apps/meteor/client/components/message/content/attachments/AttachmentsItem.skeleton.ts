## File: apps/meteor/client/components/message/content/attachments/AttachmentsItem.tsx

```typescript
import type { MessageAttachmentBase } from '@rocket.chat/core-typings';
import { isFileAttachment, isQuoteAttachment } from '@rocket.chat/core-typings';
import { memo } from 'react';

import DefaultAttachment from './DefaultAttachment';
import FileAttachment from './FileAttachment';
import { QuoteAttachment } from './QuoteAttachment';
import type { AudioAttachmentSource } from './file/AudioAttachment';

export type AttachmentsItemProps = {
	attachment: MessageAttachmentBase;
	id: string | undefined;
	source?: AudioAttachmentSource;
};

const AttachmentsItem = ({ attachment, id, source }: AttachmentsItemProps) => {
    /* Implementation Hidden */
};

export default memo(AttachmentsItem);

```