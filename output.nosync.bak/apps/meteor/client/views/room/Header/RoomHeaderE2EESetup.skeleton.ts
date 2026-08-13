## File: apps/meteor/client/views/room/Header/RoomHeaderE2EESetup.tsx

```typescript
import { lazy } from 'react';

import RoomHeader from './RoomHeader';
import type { RoomHeaderProps } from './RoomHeader';
import { useE2EERoomState } from '../hooks/useE2EERoomState';
import { useE2EEState } from '../hooks/useE2EEState';

const RoomToolboxE2EESetup = lazy(() => import('./RoomToolbox/RoomToolboxE2EESetup'));

const RoomHeaderE2EESetup = ({ room }: RoomHeaderProps) => {
    /* Implementation Hidden */
};

export default RoomHeaderE2EESetup;

```