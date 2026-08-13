## File: apps/meteor/client/views/room/body/hooks/useHasNewMessages.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { isEditedMessage } from '@rocket.chat/core-typings';
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import { clientCallbacks } from '@rocket.chat/ui-client';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { RoomHistoryManager } from '../../../../../app/ui-utils/client';
import { useChat } from '../../contexts/ChatContext';

export const useHasNewMessages = (
	rid: string,
	uid: string | undefined,
	setShouldJumpToBottom: Dispatch<SetStateAction<boolean>>,
	isAtBottom: MutableRefObject<boolean>,
) => {
    /* Implementation Hidden */
};

```