## File: apps/meteor/client/components/message/toolbar/useReplyInDMAction.ts

```typescript
import { type IMessage, type ISubscription, type IRoom, isE2EEMessage } from '@rocket.chat/core-typings';
import { useEmbeddedLayout } from '@rocket.chat/ui-client';
import { usePermission, useRouter, useUser } from '@rocket.chat/ui-contexts';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

import type { MessageActionConfig } from '../../../../app/ui-utils/client/lib/MessageAction';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import { Rooms, Subscriptions } from '../../../stores';

export const useReplyInDMAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
    /* Implementation Hidden */
};

```