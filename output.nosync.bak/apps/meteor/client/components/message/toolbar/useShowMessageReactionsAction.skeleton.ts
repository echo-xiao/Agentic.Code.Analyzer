## File: apps/meteor/client/components/message/toolbar/useShowMessageReactionsAction.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useSetModal } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import ReactionListModal from '../../../views/room/modals/ReactionListModal';

export const useShowMessageReactionsAction = (message: IMessage): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```