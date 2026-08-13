## File: apps/meteor/client/views/teams/contextualBar/info/ConvertToChannelModal/ConvertToChannelModal.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { GenericModalSkeleton } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import BaseConvertToChannelModal from './BaseConvertToChannelModal';
import { teamsQueryKeys } from '../../../../../lib/queryKeys';

type ConvertToChannelModalProps = {
	onClose: () => void;
	onCancel: () => void;
	onConfirm: (deletedRooms: { [key: string]: Serialized<IRoom> }) => void;
	teamId: string;
	userId: string;
};

const ConvertToChannelModal = ({ onClose, onCancel, onConfirm, teamId, userId }: ConvertToChannelModalProps) => {
    /* Implementation Hidden */
};

export default ConvertToChannelModal;

```