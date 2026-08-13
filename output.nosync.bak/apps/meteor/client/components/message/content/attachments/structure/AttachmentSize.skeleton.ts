## File: apps/meteor/client/components/message/content/attachments/structure/AttachmentSize.tsx

```typescript
import type { Box } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

import Title from './AttachmentTitle';
import { useFormatMemorySize } from '../../../../../hooks/useFormatMemorySize';

export type AttachmentSizeProps = ComponentPropsWithoutRef<typeof Box> & { size: number; wrapper?: boolean };

const AttachmentSize = ({ size, wrapper = true, ...props }: AttachmentSizeProps) => {
    /* Implementation Hidden */
};

export default AttachmentSize;

```