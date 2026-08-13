## File: apps/meteor/server/api/v1/omnichannel/lib/inquiries.ts

```typescript
import { LivechatInquiryStatus } from '@rocket.chat/core-typings';
import type { ILivechatInquiryRecord, IRoom, IUser } from '@rocket.chat/core-typings';
import { LivechatDepartmentAgents, LivechatDepartment, LivechatInquiry } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import type { Filter } from 'mongodb';

import { getOmniChatSortQuery } from '../../../../../app/livechat/lib/inquiries';
import { getInquirySortMechanismSetting } from '../../../../../app/livechat/server/lib/settings';

const agentDepartments = async (userId: IUser['_id']): Promise<string[]> => {
    /* Implementation Hidden */
};

const applyDepartmentRestrictions = async (
	userId: IUser['_id'],
	filterDepartment?: string,
): Promise<{ $in: string[] } | { $exists: false } | string> => {
    /* Implementation Hidden */
};

export async function findInquiries({
	userId,
	department: filterDepartment,
	status,
	pagination: { offset, count, sort },
}: {
	userId: IUser['_id'];
	department?: string;
	status?: LivechatInquiryStatus;
	pagination: { offset: number; count: number; sort: Record<string, number> };
}): Promise<PaginatedResult<{ inquiries: Array<ILivechatInquiryRecord> }>> {
    /* Implementation Hidden */
}

export async function findOneInquiryByRoomId({ roomId }: { roomId: IRoom['_id'] }): Promise<{ inquiry: ILivechatInquiryRecord | null }> {
    /* Implementation Hidden */
}

```