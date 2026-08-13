## File: apps/meteor/client/components/message/content/attachments/default/ActionAttachtment.tsx

```typescript
import type { MessageAttachmentAction } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';

import ActionAttachmentButton from './ActionAttachmentButton';
import { useExternalLink } from '../../../../../hooks/useExternalLink';

export type ActionAttachmentProps = MessageAttachmentAction;

export const ActionAttachment = ({ actions }: ActionAttachmentProps) => {
    /* Implementation Hidden */
};

```