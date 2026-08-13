## File: apps/meteor/client/views/room/E2EESetup/RoomE2EESetup.tsx

```typescript
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import RoomE2EENotAllowed from './RoomE2EENotAllowed';
import { e2e } from '../../../lib/e2ee';
import { getStoredItem, STORAGE_KEYS } from '../../../lib/sdk/storage';
import RoomBody from '../body/RoomBody';
import { useRoom } from '../contexts/RoomContext';
import { useE2EERoomState } from '../hooks/useE2EERoomState';
import { useE2EEState } from '../hooks/useE2EEState';

const RoomE2EESetup = () => {
    /* Implementation Hidden */
};

export default RoomE2EESetup;

```