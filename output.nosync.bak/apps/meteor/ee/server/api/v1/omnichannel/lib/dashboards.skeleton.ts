## File: apps/meteor/ee/server/api/v1/omnichannel/lib/dashboards.ts

```typescript
import type { ReportResult, ReportWithUnmatchingElements, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatRooms } from '@rocket.chat/models';
import mem from 'mem';
import type { Filter } from 'mongodb';

type AggParams = { start: Date; end: Date; sort: Record<string, 1 | -1>; extraQuery: Filter<IOmnichannelRoom> };

const defaultValue = { data: [], total: 0 };
export const findAllConversationsBySource = async ({ start, end, extraQuery }: Omit<AggParams, 'sort'>): Promise<ReportResult> => {
    /* Implementation Hidden */
};

export const findAllConversationsByStatus = async ({ start, end, extraQuery }: Omit<AggParams, 'sort'>): Promise<ReportResult> => {
    /* Implementation Hidden */
};

export const findAllConversationsByDepartment = async ({
	start,
	end,
	sort,
	extraQuery,
}: AggParams): Promise<ReportWithUnmatchingElements> => {
    /* Implementation Hidden */
};

export const findAllConversationsByTags = async ({ start, end, sort, extraQuery }: AggParams): Promise<ReportWithUnmatchingElements> => {
    /* Implementation Hidden */
};

export const findAllConversationsByAgents = async ({ start, end, sort, extraQuery }: AggParams): Promise<ReportWithUnmatchingElements> => {
    /* Implementation Hidden */
};

export const findAllConversationsBySourceCached = mem(findAllConversationsBySource, { maxAge: 60000, cacheKey: JSON.stringify });
export const findAllConversationsByStatusCached = mem(findAllConversationsByStatus, { maxAge: 60000, cacheKey: JSON.stringify });
export const findAllConversationsByDepartmentCached = mem(findAllConversationsByDepartment, { maxAge: 60000, cacheKey: JSON.stringify });
export const findAllConversationsByTagsCached = mem(findAllConversationsByTags, { maxAge: 60000, cacheKey: JSON.stringify });
export const findAllConversationsByAgentsCached = mem(findAllConversationsByAgents, { maxAge: 60000, cacheKey: JSON.stringify });

```