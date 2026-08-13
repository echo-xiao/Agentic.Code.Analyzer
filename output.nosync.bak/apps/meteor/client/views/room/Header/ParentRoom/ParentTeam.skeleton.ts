## File: apps/meteor/client/views/room/Header/ParentRoom/ParentTeam.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { TeamType } from '@rocket.chat/core-typings';
import { useUserId } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import ParentRoomButton from './ParentRoomButton';
import { useTeamInfoQuery } from '../../../../hooks/useTeamInfoQuery';
import { useGoToRoom } from '../../hooks/useGoToRoom';
import { useUserTeamsQuery } from '../../hooks/useUserTeamsQuery';

type APIErrorResult = { success: boolean; error: string };

export type ParentTeamProps = {
	room: IRoom;
};

const ParentTeam = ({ room }: ParentTeamProps) => {
    /* Implementation Hidden */
};

export default ParentTeam;

```