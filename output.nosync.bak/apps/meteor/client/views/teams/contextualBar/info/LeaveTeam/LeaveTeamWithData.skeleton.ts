## File: apps/meteor/client/views/teams/contextualBar/info/LeaveTeam/LeaveTeamWithData.tsx

```typescript
import type { ITeam } from '@rocket.chat/core-typings';
import { GenericModalSkeleton } from '@rocket.chat/ui-client';
import { useUserId, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import LeaveTeamModal from './LeaveTeamModal/LeaveTeamModal';

type LeaveTeamWithDataProps = {
	teamId: ITeam['_id'];
	onCancel: () => void;
	onConfirm: () => void;
};

const LeaveTeamWithData = ({ teamId, onCancel, onConfirm }: LeaveTeamWithDataProps) => {
    /* Implementation Hidden */
};

export default LeaveTeamWithData;

```