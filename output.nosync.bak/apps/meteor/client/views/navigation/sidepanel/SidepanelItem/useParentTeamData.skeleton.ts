## File: apps/meteor/client/views/navigation/sidepanel/SidepanelItem/useParentTeamData.ts

```typescript
import type { ITeam } from '@rocket.chat/core-typings';
import { TeamType } from '@rocket.chat/core-typings';
import { useUserId } from '@rocket.chat/ui-contexts';

import { useTeamInfoQuery } from '../../../../hooks/useTeamInfoQuery';
import { useUserTeamsQuery } from '../../../room/hooks/useUserTeamsQuery';

type APIErrorResult = { success: boolean; error: string };

export const useParentTeamData = (teamId?: ITeam['_id']) => {
    /* Implementation Hidden */
};

```