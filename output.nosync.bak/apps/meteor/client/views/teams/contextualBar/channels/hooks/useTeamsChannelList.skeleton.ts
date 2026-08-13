## File: apps/meteor/client/views/teams/contextualBar/channels/hooks/useTeamsChannelList.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { teamsQueryKeys } from '../../../../../lib/queryKeys';
import { getConfig } from '../../../../../lib/utils/getConfig';
import { mapMessageFromApi } from '../../../../../lib/utils/mapMessageFromApi';

type TeamsChannelListOptions = {
	teamId: string;
	type: 'all' | 'autoJoin';
	text: string;
};

export const useTeamsChannelList = ({ teamId, type, text }: TeamsChannelListOptions) => {
    /* Implementation Hidden */
};

```