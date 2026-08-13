## File: apps/meteor/client/hooks/roomActions/useAutotranslateRoomAction.ts

```typescript
import { useSetting, usePermission } from '@rocket.chat/ui-contexts';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useMemo } from 'react';

const AutoTranslate = lazy(() => import('../../views/room/contextualBar/AutoTranslate'));

export const useAutotranslateRoomAction = () => {
    /* Implementation Hidden */
};

```