## File: apps/meteor/client/views/omnichannel/hooks/useTagsList.ts

```typescript
import type { ILivechatTag, Serialized } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

type TagsListOptions = {
	filter: string;
	department?: string;
	viewAll?: boolean;
	limit?: number;
};

export type TagListItem = {
	_id: string;
	label: string;
	value: string;
};

const DEFAULT_QUERY_LIMIT = 25;

export const useTagsList = (options: TagsListOptions) => {
    /* Implementation Hidden */
};

```