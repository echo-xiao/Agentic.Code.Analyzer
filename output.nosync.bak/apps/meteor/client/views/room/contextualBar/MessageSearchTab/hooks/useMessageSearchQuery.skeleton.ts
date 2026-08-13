## File: apps/meteor/client/views/room/contextualBar/MessageSearchTab/hooks/useMessageSearchQuery.ts

```typescript
import { useMethod, useTranslation, useUserId } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useRoom } from '../../../contexts/RoomContext';

export const useMessageSearchQuery = ({
	searchText,
	limit,
	globalSearch,
}: {
	searchText: string;
	limit: number;
	globalSearch: boolean;
}) => {
    /* Implementation Hidden */
};

```