## File: apps/meteor/client/components/message/content/attachments/default/ActionAttachmentButton.tsx

```typescript
import type { IMessage, MessageAttachmentAction } from '@rocket.chat/core-typings';
import { Button } from '@rocket.chat/fuselage';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';

import { usePerformActionMutation } from './hooks/usePerformActionMutation';

type ProcessingType = Exclude<MessageAttachmentAction['actions'][number]['msg_processing_type'], undefined>;

export type ActionAttachmentButtonProps = {
	children: ReactNode;
	mid?: IMessage['_id'];
	msg?: string;
	processingType: ProcessingType;
};

const ActionAttachmentButton = ({ children, processingType, msg, mid }: ActionAttachmentButtonProps) => {
    /* Implementation Hidden */
};

export default ActionAttachmentButton;

```