## File: apps/meteor/client/views/room/contextualBar/Info/hooks/useRoomActions.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useRoomConvertToTeam } from './actions/useRoomConvertToTeam';
import { useRoomLeave } from './actions/useRoomLeave';
import { useRoomMoveToTeam } from './actions/useRoomMoveToTeam';
import { useHideRoomAction } from '../../../../../hooks/useHideRoomAction';
import { useDeleteRoom } from '../../../../hooks/roomActions/useDeleteRoom';

type UseRoomActionsOptions = {
	onClickEnterRoom?: () => void;
	onClickEdit?: () => void;
	resetState?: () => void;
};

export const useRoomActions = (room: IRoom, options: UseRoomActionsOptions) => {
    /* Implementation Hidden */
};

```