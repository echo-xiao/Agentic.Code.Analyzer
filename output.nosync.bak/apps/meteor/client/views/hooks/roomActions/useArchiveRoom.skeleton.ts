## File: apps/meteor/client/views/hooks/roomActions/useArchiveRoom.ts

```typescript
import type { IRoom, RoomAdminFieldsType } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

export const useArchiveRoom = (room: Pick<IRoom, RoomAdminFieldsType>) => {
    /* Implementation Hidden */
};

```