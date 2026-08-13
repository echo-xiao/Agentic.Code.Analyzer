## File: apps/meteor/client/components/message/content/attachments/structure/AttachmentDownloadBase.tsx

```typescript
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import Action from '../../Action';

export type AttachmentDownloadBaseProps = Omit<ComponentProps<typeof Action>, 'icon'> & { title?: string | undefined; href: string };

const AttachmentDownloadBase = ({ title, href, disabled, ...props }: AttachmentDownloadBaseProps) => {
    /* Implementation Hidden */
};

export default AttachmentDownloadBase;

```