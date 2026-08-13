## File: apps/meteor/client/views/teams/contextualBar/members/RemoveUsersModal/RemoveUsersModal.tsx

```typescript
import type { Serialized, IRoom } from '@rocket.chat/core-typings';
import { GenericModalSkeleton } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import BaseRemoveUsersModal from './BaseRemoveUsersModal';
import { teamsQueryKeys, usersQueryKeys } from '../../../../../lib/queryKeys';

type RemoveUsersModalProps = {
	onClose: () => void;
	onCancel: () => void;
	onConfirm: (deletedRooms: { [key: string]: Serialized<IRoom> }) => void;
	teamId: string;
	userId: string;
};

const RemoveUsersModal = ({ teamId, userId, onClose, onCancel, onConfirm }: RemoveUsersModalProps) => {
    /* Implementation Hidden */
};

export default RemoveUsersModal;

```