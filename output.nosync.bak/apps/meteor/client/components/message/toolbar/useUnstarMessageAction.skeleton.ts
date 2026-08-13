## File: apps/meteor/client/components/message/toolbar/useUnstarMessageAction.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import { useSetting, useUser } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { useUnstarMessageMutation } from '../hooks/useUnstarMessageMutation';

export const useUnstarMessageAction = (message: IMessage, { room }: { room: IRoom }): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```