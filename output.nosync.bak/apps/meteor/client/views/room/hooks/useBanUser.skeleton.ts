## File: apps/meteor/client/views/room/hooks/useBanUser.tsx

```typescript
import { escapeHTML } from '@rocket.chat/string-helpers';
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useUserRoom, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { roomsQueryKeys } from '../../../lib/queryKeys';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';

type UseBanUserProps = {
	roomId: string;
};

export const useBanUser = ({ roomId }: UseBanUserProps) => {
    /* Implementation Hidden */
};

```