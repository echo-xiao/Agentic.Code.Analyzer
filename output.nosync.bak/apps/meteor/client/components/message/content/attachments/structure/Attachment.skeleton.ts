## File: apps/meteor/client/components/message/content/attachments/structure/Attachment.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import { useAttachmentDimensions } from '@rocket.chat/ui-contexts';
import type { ComponentPropsWithoutRef } from 'react';

const className = css`
	white-space: normal;
`;

export type AttachmentProps = ComponentPropsWithoutRef<typeof Box>;

const Attachment = (props: AttachmentProps) => {
    /* Implementation Hidden */
};

export default Attachment;

```