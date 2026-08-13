## File: apps/meteor/client/views/hooks/roomActions/useDeleteRoom.tsx

```typescript
import type { IRoom, RoomAdminFieldsType } from '@rocket.chat/core-typings';
import { isRoomFederated } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useRouter, usePermission, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useTeamInfoQuery } from '../../../hooks/useTeamInfoQuery';
import DeleteTeamModal from '../../teams/contextualBar/info/DeleteTeam';

export const useDeleteRoom = (room: IRoom | Pick<IRoom, RoomAdminFieldsType>, { reload }: { reload?: () => void } = {}) => {
    /* Implementation Hidden */
};

```