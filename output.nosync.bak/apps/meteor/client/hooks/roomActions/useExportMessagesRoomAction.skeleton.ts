## File: apps/meteor/client/hooks/roomActions/useExportMessagesRoomAction.ts

```typescript
import { usePermission } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';

import { useRoom } from '../../views/room/contexts/RoomContext';

const ExportMessages = lazy(() => import('../../views/room/contextualBar/ExportMessages'));

export const useExportMessagesRoomAction = () => {
    /* Implementation Hidden */
};

```