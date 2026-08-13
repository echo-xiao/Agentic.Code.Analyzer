## File: apps/meteor/client/components/message/content/attachments/structure/AttachmentDownload.tsx

```typescript
import type { ComponentPropsWithoutRef } from 'react';

import AttachmentDownloadBase from './AttachmentDownloadBase';
import AttachmentEncryptedDownload from './AttachmentEncryptedDownload';
import type Action from '../../Action';

export type AttachmentDownloadProps = Omit<ComponentPropsWithoutRef<typeof Action>, 'icon'> & { title?: string | undefined; href: string };

const AttachmentDownload = ({ title, href, ...props }: AttachmentDownloadProps) => {
    /* Implementation Hidden */
};

export default AttachmentDownload;

```