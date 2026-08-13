## File: apps/meteor/client/views/navigation/sidepanel/hooks/useRoomMenuActions.ts

```typescript
import type { RoomType } from '@rocket.chat/core-typings';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { usePermission, useRouter, useSetting, useUserSubscription } from '@rocket.chat/ui-contexts';
import type { LocationPathname } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useLeaveRoomAction } from '../../../../hooks/menuActions/useLeaveRoom';
import { useToggleFavoriteAction } from '../../../../hooks/menuActions/useToggleFavoriteAction';
import { useToggleNotificationAction } from '../../../../hooks/menuActions/useToggleNotificationsAction';
import { useToggleReadAction } from '../../../../hooks/menuActions/useToggleReadAction';
import { useHideRoomAction } from '../../../../hooks/useHideRoomAction';
import { useOmnichannelPrioritiesMenu } from '../../../omnichannel/hooks/useOmnichannelPrioritiesMenu';

type RoomMenuActionsProps = {
	rid: string;
	type: RoomType;
	name: string;
	isUnread?: boolean;
	cl?: boolean;
	roomOpen?: boolean;
	hideDefaultOptions: boolean;
	href: LocationPathname | undefined;
};

export const useRoomMenuActions = ({
	rid,
	type,
	name,
	isUnread,
	cl,
	roomOpen,
	hideDefaultOptions,
	href,
}: RoomMenuActionsProps): { title: string; items: GenericMenuItemProps[] }[] => {
    /* Implementation Hidden */
};

```