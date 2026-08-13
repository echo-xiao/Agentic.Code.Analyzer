## File: apps/meteor/client/views/admin/ABAC/hooks/useAttributeOptions.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { GenericModal } from '@rocket.chat/ui-client';
import { useRouter, useSetModal, useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trans, useTranslation } from 'react-i18next';

import { useIsABACAvailable } from './useIsABACAvailable';
import { useViewRoomsAction } from './useViewRoomsAction';
import { ABACQueryKeys } from '../../../../lib/queryKeys';

export const useAttributeOptions = (attribute: { _id: string; key: string }): GenericMenuItemProps[] => {
    /* Implementation Hidden */
};

```