## File: apps/meteor/client/components/message/toolbar/useViewOriginalTranslationAction.ts

```typescript
import type { IMessage, IRoom, ISubscription } from '@rocket.chat/core-typings';
import { useEndpoint, usePermission, useSetting, useUser } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { AutoTranslate } from '../../../../app/autotranslate/client';
import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import { Messages } from '../../../stores';
import { hasTranslationLanguageInAttachments, hasTranslationLanguageInMessage } from '../../../views/room/MessageList/lib/autoTranslate';

export const useViewOriginalTranslationAction = (
	message: IMessage & { autoTranslateShowInverse?: boolean },
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```