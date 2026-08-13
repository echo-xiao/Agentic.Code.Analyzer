## File: apps/meteor/client/views/admin/ABAC/hooks/useRoomItems.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { useDeleteRoomModal } from './useDeleteRoomModal';
import { useIsABACAvailable } from './useIsABACAvailable';

export const useRoomItems = (room: { rid: string; name: string }): GenericMenuItemProps[] => {
    /* Implementation Hidden */
};

```