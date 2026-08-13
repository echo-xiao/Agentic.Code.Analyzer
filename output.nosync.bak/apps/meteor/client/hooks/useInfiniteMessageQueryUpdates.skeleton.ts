## File: apps/meteor/client/hooks/useInfiniteMessageQueryUpdates.ts

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useStream, useUserId } from '@rocket.chat/ui-contexts';
import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useInfiniteMessageQueryUpdates = <T extends IMessage, TQueryKey extends readonly unknown[]>({
	queryKey,
	roomId,
	filter,
	compare = (a, b) => b.ts.getTime() - a.ts.getTime(),
}: {
	queryKey: TQueryKey;
	roomId: IRoom['_id'];
	filter: (message: IMessage) => message is T;
	compare?: (a: T, b: T) => number;
}) => {
    /* Implementation Hidden */
};

```