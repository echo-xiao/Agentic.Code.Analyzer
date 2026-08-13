## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/DeleteRoomModal.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { GenericModal } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { Trans, useTranslation } from 'react-i18next';

import { useEndpointMutation } from '../../../../hooks/useEndpointMutation';
import { ABACQueryKeys } from '../../../../lib/queryKeys';

export type DeleteRoomModalProps = {
	rid: IRoom['_id'];
	roomName: string;
	onClose: () => void;
};

const DeleteRoomModal = ({ rid, roomName, onClose }: DeleteRoomModalProps) => {
    /* Implementation Hidden */
};

export default DeleteRoomModal;

```