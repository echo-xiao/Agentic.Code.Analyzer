## File: apps/meteor/ee/server/models/raw/LivechatInquiry.ts

```typescript
import type { ILivechatInquiryRecord, ILivechatPriority } from '@rocket.chat/core-typings';
import { DEFAULT_SLA_CONFIG, LivechatPriorityWeight } from '@rocket.chat/core-typings';
import type { ILivechatInquiryModel } from '@rocket.chat/model-typings';
import { LivechatInquiryRaw } from '@rocket.chat/models';
import type { UpdateResult, Document, WithId } from 'mongodb';

declare module '@rocket.chat/model-typings' {
	interface ILivechatInquiryModel {
		setSlaForRoom(rid: string, sla: { estimatedWaitingTimeQueue: number; slaId: string }): Promise<null | WithId<ILivechatInquiryRecord>>;
		unsetSlaForRoom(rid: string): Promise<null | WithId<ILivechatInquiryRecord>>;
		bulkUnsetSla(roomIds: string[]): Promise<Document | UpdateResult>;
		setPriorityForRoom(rid: string, priority: Pick<ILivechatPriority, '_id' | 'sortItem'>): Promise<null | WithId<ILivechatInquiryRecord>>;
		unsetPriorityForRoom(rid: string): Promise<null | WithId<ILivechatInquiryRecord>>;
	}
}

// Note: Expect a circular dependency error here 😓
export class LivechatInquiryRawEE extends LivechatInquiryRaw implements ILivechatInquiryModel {
	override setSlaForRoom(
		rid: string,
		sla: { estimatedWaitingTimeQueue: number; slaId: string },
	): Promise<null | WithId<ILivechatInquiryRecord>> {
        /* Implementation Hidden */
    }

	override unsetSlaForRoom(rid: string): Promise<null | WithId<ILivechatInquiryRecord>> {
        /* Implementation Hidden */
    }

	override bulkUnsetSla(roomIds: string[]): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	override setPriorityForRoom(
		rid: string,
		priority: Pick<ILivechatPriority, '_id' | 'sortItem'>,
	): Promise<null | WithId<ILivechatInquiryRecord>> {
        /* Implementation Hidden */
    }

	override unsetPriorityForRoom(rid: string): Promise<null | WithId<ILivechatInquiryRecord>> {
        /* Implementation Hidden */
    }
}

```