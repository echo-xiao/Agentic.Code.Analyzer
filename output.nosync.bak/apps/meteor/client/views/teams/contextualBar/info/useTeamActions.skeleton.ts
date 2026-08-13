## File: apps/meteor/client/views/teams/contextualBar/info/useTeamActions.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useConvertToChannel } from './useConvertToChannel';
import { useLeaveTeam } from './useLeaveTeam';
import { useHideRoomAction } from '../../../../hooks/useHideRoomAction';
import { useDeleteRoom } from '../../../hooks/roomActions/useDeleteRoom';

type GenProps = {
	onClickEdit?: () => void;
};

export const useTeamActions = (room: IRoom, { onClickEdit }: GenProps) => {
    /* Implementation Hidden */
};

```