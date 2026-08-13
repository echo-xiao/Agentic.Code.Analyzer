## File: apps/meteor/client/components/message/content/attachments/default/hooks/usePerformActionMutation.ts

```typescript
import type { IMessage, MessageAttachmentAction } from '@rocket.chat/core-typings';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { useChat } from '../../../../../../views/room/contexts/ChatContext';

type ProcessingType = Exclude<MessageAttachmentAction['actions'][number]['msg_processing_type'], undefined>;

type UsePerfomActionMutationParams = {
	processingType: ProcessingType;
	msg?: string;
	mid?: IMessage['_id'];
};

export const usePerformActionMutation = (
	options?: Omit<UseMutationOptions<void, Error, UsePerfomActionMutationParams>, 'mutationFn'>,
): UseMutationResult<void, Error, UsePerfomActionMutationParams> => {
    /* Implementation Hidden */
};

```