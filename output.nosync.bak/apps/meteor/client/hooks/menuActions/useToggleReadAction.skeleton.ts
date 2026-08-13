## File: apps/meteor/client/hooks/menuActions/useToggleReadAction.ts

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useRouter, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';

import { LegacyRoomManager } from '../../../app/ui-utils/client';
import { useMarkAsUnreadMutation } from '../../components/message/hooks/useMarkAsUnreadMutation';

type ToggleReadActionProps = {
	rid: string;
	isUnread?: boolean;
	subscription?: ISubscription;
};

export const useToggleReadAction = ({ rid, isUnread, subscription }: ToggleReadActionProps) => {
    /* Implementation Hidden */
};

```