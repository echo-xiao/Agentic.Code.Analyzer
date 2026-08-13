## File: apps/meteor/client/components/message/toolbar/useReadReceiptsDetailsAction.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useSetModal } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import ReadReceiptsModal from '../../../views/room/modals/ReadReceiptsModal';
import { useMessageListReadReceipts } from '../list/MessageListContext';

export const useReadReceiptsDetailsAction = (message: IMessage): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```