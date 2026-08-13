## File: apps/meteor/client/views/room/contextualBar/Threads/hooks/useThreadsList.ts

```typescript
import type { IThreadMainMessage, IMessage, ISubscription } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { useEndpoint, useUserId } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useInfiniteMessageQueryUpdates } from '../../../../../hooks/useInfiniteMessageQueryUpdates';
import { roomsQueryKeys } from '../../../../../lib/queryKeys';
import { getConfig } from '../../../../../lib/utils/getConfig';
import { mapMessageFromApi } from '../../../../../lib/utils/mapMessageFromApi';

type ThreadsListOptions =
	| {
			rid: IMessage['rid'];
			text?: string;
			type: 'unread';
			tunread: ISubscription['tunread'];
	  }
	| {
			rid: IMessage['rid'];
			text?: string;
			type: 'following';
			tunread?: never;
	  }
	| {
			rid: IMessage['rid'];
			text?: string;
			type?: undefined;
			tunread?: never;
	  };

export const useThreadsList = ({ rid, text, type, tunread }: ThreadsListOptions) => {
    /* Implementation Hidden */
};

```