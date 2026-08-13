## File: apps/meteor/client/hooks/useRoomMenuActions.ts

```typescript
import type { RoomType } from '@rocket.chat/core-typings';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { usePermission, useSetting, useUserSubscription } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useLeaveRoomAction } from './menuActions/useLeaveRoom';
import { useToggleFavoriteAction } from './menuActions/useToggleFavoriteAction';
import { useToggleReadAction } from './menuActions/useToggleReadAction';
import { useHideRoomAction } from './useHideRoomAction';
import { useOmnichannelPrioritiesMenu } from '../views/omnichannel/hooks/useOmnichannelPrioritiesMenu';

type RoomMenuActionsProps = {
	rid: string;
	type: RoomType;
	name: string;
	isUnread?: boolean;
	cl?: boolean;
	roomOpen?: boolean;
	hideDefaultOptions: boolean;
};

export const useRoomMenuActions = ({
	rid,
	type,
	name,
	isUnread,
	cl,
	roomOpen,
	hideDefaultOptions,
}: RoomMenuActionsProps): { title: string; items: GenericMenuItemProps[] }[] => {
    /* Implementation Hidden */
};

```