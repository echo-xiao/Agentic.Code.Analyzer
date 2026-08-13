## File: apps/meteor/server/api/v1/omnichannel/lib/transfer.ts

```typescript
import type { IOmnichannelSystemMessage } from '@rocket.chat/core-typings';
import { Messages } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';

const normalizeTransferHistory = ({ transferData }: IOmnichannelSystemMessage): IOmnichannelSystemMessage['transferData'] => transferData;

const removeNulls = <S>(value: S | undefined): value is S => value != null;

export async function findLivechatTransferHistory({
	rid,
	pagination: { offset, count, sort },
}: {
	rid: string;
	pagination: { offset: number; count: number; sort: Record<string, number> };
}): Promise<PaginatedResult<{ history: IOmnichannelSystemMessage['transferData'][] }>> {
    /* Implementation Hidden */
}

```