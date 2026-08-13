## File: apps/meteor/client/components/message/toolbar/useWebDAVMessageAction.tsx

```typescript
import type { IMessage, ISubscription } from '@rocket.chat/core-typings';
import { useSetModal, useSetting } from '@rocket.chat/ui-contexts';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { getURL } from '../../../../app/utils/client';
import { useWebDAVAccountIntegrationsQuery } from '../../../hooks/webdav/useWebDAVAccountIntegrationsQuery';
import SaveToWebdavModal from '../../../views/room/webdav/SaveToWebdavModal';

export const useWebDAVMessageAction = (
	message: IMessage,
	{ subscription }: { subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```