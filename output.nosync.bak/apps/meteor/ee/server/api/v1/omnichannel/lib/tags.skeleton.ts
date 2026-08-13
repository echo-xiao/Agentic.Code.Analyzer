## File: apps/meteor/ee/server/api/v1/omnichannel/lib/tags.ts

```typescript
import type { ILivechatTag, FindTagsResult } from '@rocket.chat/core-typings';
import { LivechatTag } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Filter, FindOptions } from 'mongodb';

import { getDepartmentsWhichUserCanAccess } from './departments';
import { hasPermissionAsync } from '../../../../../../server/lib/authorization/hasPermission';
import { helperLogger } from '../../../../../app/livechat-enterprise/server/lib/logger';

type FindTagsParams = {
	userId: string;
	text?: string;
	pagination: {
		offset: number;
		count: number;
		sort: FindOptions<ILivechatTag>['sort'];
	};
	department?: string;
	viewAll?: boolean;
};

type FindTagsByIdParams = {
	userId: string;
	tagId: string;
};

type FindTagsByIdResult = ILivechatTag | null;

// If viewAll is true
//  -> & user has access to all tags
//      -> then all tags will be returned
//          -> Pages:
//              - Admin > Omnichannel > Tags
//              - Current chat's panel, filter by tags
//              - Canned response creation
//  -> & user does not have access to all tags
//      -> then only public tags will be returned (unauthorized access - no page uses this)
// If viewAll is false
// -> & user has access to all tags
//      -> & department is not specified
//          -> only public tags will be returned (Pages: Close chat modal tag selection for chats not associated with a department being closed by manager)
//      -> & department is specified
//          -> only tags associated with the department will be returned (Page: Close chat modal tag selection for chats associated with a department being closed by manager)
// -> & user does not have access to all tags (same as viewAll = false & user has access to all tags)
//      -> & department is not specified
//          -> only public tags will be returned (Page: Close chat modal tag selection for chats not associated with a department being closed by agent)
//      -> & department is specified
//          -> only tags associated with the department will be returned (Page: Close chat modal tag selection for chats associated with a department being closed by agent)
export async function findTags({
	userId,
	text,
	department,
	viewAll,
	pagination: { offset, count, sort },
}: FindTagsParams): Promise<FindTagsResult> {
    /* Implementation Hidden */
}

export async function findTagById({ tagId }: FindTagsByIdParams): Promise<FindTagsByIdResult> {
    /* Implementation Hidden */
}

```