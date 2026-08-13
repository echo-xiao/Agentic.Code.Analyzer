## File: apps/meteor/client/hooks/roomActions/useCallsRoomAction.ts

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';
import { lazy, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RoomContext } from '../../views/room/contexts/RoomContext';
import { useHasLicenseModule } from '../useHasLicenseModule';

const VideoConfList = lazy(() => import('../../views/room/contextualBar/VideoConference/VideoConfList'));

export const useCallsRoomAction = () => {
    /* Implementation Hidden */
};

```