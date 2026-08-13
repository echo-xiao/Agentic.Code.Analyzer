## File: apps/meteor/client/components/message/content/attachments/structure/AttachmentEncryptedDownload.tsx

```typescript
import type { ComponentProps } from 'react';

import AttachmentDownloadBase from './AttachmentDownloadBase';
import { useDownloadFromServiceWorker } from '../../../../../hooks/useDownloadFromServiceWorker';

type AttachmentDownloadProps = ComponentProps<typeof AttachmentDownloadBase>;

const AttachmentEncryptedDownload = ({ title, href, ...props }: AttachmentDownloadProps) => {
    /* Implementation Hidden */
};

export default AttachmentEncryptedDownload;

```