## File: apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/DeleteTeamModalWithRooms.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { GenericModalSkeleton } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import DeleteTeamModal from './DeleteTeamModal';

type DeleteTeamModalWithRoomsProps = {
	teamId: string;
	onConfirm: (roomsToDelete: IRoom['_id'][]) => void;
	onCancel: () => void;
};

const DeleteTeamModalWithRooms = ({ teamId, onConfirm, onCancel }: DeleteTeamModalWithRoomsProps) => {
    /* Implementation Hidden */
};

export default DeleteTeamModalWithRooms;

```