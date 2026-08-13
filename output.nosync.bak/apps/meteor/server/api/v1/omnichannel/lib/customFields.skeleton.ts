## File: apps/meteor/server/api/v1/omnichannel/lib/customFields.ts

```typescript
import type { ILivechatCustomField } from '@rocket.chat/core-typings';
import { LivechatCustomField, LivechatVisitors, LivechatRooms } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { UpdateResult, Document } from 'mongodb';

export async function findLivechatCustomFields({
	text,
	pagination: { offset, count, sort },
}: {
	text?: string;
	pagination: { offset: number; count: number; sort: Record<string, number> };
}): Promise<PaginatedResult<{ customFields: Array<ILivechatCustomField> }>> {
    /* Implementation Hidden */
}

export async function findCustomFieldById({
	customFieldId,
}: {
	customFieldId: string;
}): Promise<{ customField: ILivechatCustomField | null }> {
    /* Implementation Hidden */
}

export async function setCustomField(
	token: string,
	key: string,
	value: string,
	overwrite = true,
): Promise<boolean | UpdateResult | Document> {
    /* Implementation Hidden */
}

```