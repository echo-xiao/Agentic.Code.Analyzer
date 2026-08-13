## File: apps/meteor/client/views/room/contextualBar/RoomFiles/RoomFilesWithData.tsx

```typescript
import { useLocalStorage, useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useRoomToolbox } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';

import RoomFiles from './RoomFiles';
import { useDeleteFile } from './hooks/useDeleteFile';
import { useFilesList } from './hooks/useFilesList';
import { useRoom } from '../../contexts/RoomContext';

const RoomFilesWithData = () => {
    /* Implementation Hidden */
};

export default RoomFilesWithData;

```