## File: apps/meteor/client/components/message/content/attachments/FileAttachment.tsx

```typescript
import { type FileAttachmentProps, isFileAudioAttachment, isFileImageAttachment, isFileVideoAttachment } from '@rocket.chat/core-typings';

import AudioAttachment from './file/AudioAttachment';
import type { AudioAttachmentSource } from './file/AudioAttachment';
import GenericFileAttachment from './file/GenericFileAttachment';
import ImageAttachment from './file/ImageAttachment';
import VideoAttachment from './file/VideoAttachment';

type FileAttachmentComponentProps = FileAttachmentProps & {
	source?: AudioAttachmentSource;
};

const FileAttachment = ({ source, ...attachment }: FileAttachmentComponentProps) => {
    /* Implementation Hidden */
};

export default FileAttachment;

```