## File: apps/meteor/client/views/room/MessageList/hooks/useMessages.ts

```typescript
import type { IRoom, IMessage, MessageTypesValues } from '@rocket.chat/core-typings';
import { useStableArray } from '@rocket.chat/fuselage-hooks';
import { createPredicateFromFilter } from '@rocket.chat/mongo-adapter';
import { useSetting, useUserPreference } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

import { Messages } from '../../../../stores';
import { useRoom } from '../../contexts/RoomContext';

const mergeHideSysMessages = (
	sysMesArray1: Array<MessageTypesValues>,
	sysMesArray2: Array<MessageTypesValues>,
): Array<MessageTypesValues> => {
    /* Implementation Hidden */
};

export const useMessages = ({ rid }: { rid: IRoom['_id'] }): IMessage[] => {
    /* Implementation Hidden */
};

```