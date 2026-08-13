## File: apps/meteor/client/hooks/useHideRoomAction.tsx

```typescript
import type { RoomType } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModalDoNotAskAgain, useDontAskAgain } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useEndpoint, useSetModal, useToastMessageDispatch, useRouter, useUserId } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { UiTextContext } from '../../definition/IRoomTypeConfig';
import { updateSubscription } from '../lib/mutationEffects/updateSubscription';
import { roomCoordinator } from '../lib/rooms/roomCoordinator';

type HideRoomProps = {
	rid: string;
	type: RoomType;
	name: string;
};

type HideRoomOptions = {
	redirect?: boolean;
};

const CLOSE_ENDPOINTS_BY_ROOM_TYPE = {
	p: '/v1/groups.close', // private
	c: '/v1/channels.close', // channel
	d: '/v1/im.close', // direct message
	l: '/v1/channels.close', // livechat
} as const;

export const useHideRoomAction = ({ rid: roomId, type, name }: HideRoomProps, { redirect = true }: HideRoomOptions = {}) => {
    /* Implementation Hidden */
};

```