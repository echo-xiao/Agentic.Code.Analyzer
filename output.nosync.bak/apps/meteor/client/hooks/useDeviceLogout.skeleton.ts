## File: apps/meteor/client/hooks/useDeviceLogout.tsx

```typescript
import { GenericModal } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useRoute, useRouteParameter, useEndpoint, UserContext } from '@rocket.chat/ui-contexts';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { deviceManagementQueryKeys } from '../lib/queryKeys';

export const useDeviceLogout = (
	sessionId: string,
	endpoint: '/v1/sessions/logout' | '/v1/sessions/logout.me',
	isCurrentSession?: boolean,
): (() => void) => {
    /* Implementation Hidden */
};

```