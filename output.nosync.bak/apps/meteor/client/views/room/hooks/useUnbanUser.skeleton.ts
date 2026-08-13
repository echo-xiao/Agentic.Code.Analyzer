## File: apps/meteor/client/views/room/hooks/useUnbanUser.tsx

```typescript
import { escapeHTML } from '@rocket.chat/string-helpers';
import { GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, useSetModal, useToastMessageDispatch, useUserRoom } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { roomsQueryKeys } from '../../../lib/queryKeys';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';

type UseUnbanUserProps = {
	roomId: string;
};

export const useUnbanUser = ({ roomId }: UseUnbanUserProps) => {
    /* Implementation Hidden */
};

```