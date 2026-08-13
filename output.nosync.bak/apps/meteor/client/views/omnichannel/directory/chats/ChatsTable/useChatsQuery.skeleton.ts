## File: apps/meteor/client/views/omnichannel/directory/chats/ChatsTable/useChatsQuery.ts

```typescript
import { usePermission, useUserId } from '@rocket.chat/ui-contexts';
import { parse, endOfDay, startOfDay } from 'date-fns';
import { useCallback } from 'react';

import type { ChatsFiltersQuery } from '../../contexts/ChatsContext';

type CurrentChatQuery = {
	agents?: string[];
	offset?: number;
	roomName?: string;
	departmentId?: string[];
	open?: boolean;
	createdAt?: string;
	closedAt?: string;
	tags?: string[];
	onhold?: boolean;
	customFields?: string;
	sort: string;
	count?: number;
	queued?: boolean;
	units?: string[];
};

const sortDir = (sortDir: 'asc' | 'desc'): 1 | -1 => (sortDir === 'asc' ? 1 : -1);

export const useChatsQuery = () => {
    /* Implementation Hidden */
};

```