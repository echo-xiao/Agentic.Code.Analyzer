## File: apps/meteor/ee/app/livechat-enterprise/server/services/omnichannel.internalService.ts

```typescript
import { ServiceClassInternal, Message } from '@rocket.chat/core-services';
import type { IOmnichannelEEService } from '@rocket.chat/core-services';
import { isOmnichannelRoom, LivechatInquiryStatus } from '@rocket.chat/core-typings';
import type { IOmnichannelRoom, IUser, ILivechatInquiryRecord, IOmnichannelSystemMessage } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { LivechatRooms, Subscriptions, LivechatInquiry } from '@rocket.chat/models';

import {
	notifyOnSubscriptionChangedByRoomId,
	notifyOnLivechatInquiryChangedById,
	notifyOnRoomChangedById,
} from '../../../../../app/lib/server/lib/notifyListener';
import { dispatchAgentDelegated } from '../../../../../app/livechat/server/lib/Helper';
import { queueInquiry } from '../../../../../app/livechat/server/lib/QueueManager';
import { RoutingManager } from '../../../../../app/livechat/server/lib/RoutingManager';
import { settings } from '../../../../../app/settings/server';
import { callbacks } from '../../../../../server/lib/callbacks';

export class OmnichannelEE extends ServiceClassInternal implements IOmnichannelEEService {
	protected name = 'omnichannel-ee';

	protected override internal = true;

	logger: Logger;

	constructor() {
        /* Implementation Hidden */
    }

	async placeRoomOnHold(
		room: Pick<IOmnichannelRoom, '_id' | 't' | 'open' | 'onHold'>,
		comment: string,
		onHoldBy: Pick<IUser, '_id' | 'username' | 'name'>,
	) {
        /* Implementation Hidden */
    }

	async resumeRoomOnHold(
		room: Pick<IOmnichannelRoom, '_id' | 't' | 'open' | 'onHold' | 'servedBy'>,
		comment: string,
		resumeBy: Pick<IUser, '_id' | 'username' | 'name'>,
		clientAction = false,
	) {
        /* Implementation Hidden */
    }

	private async attemptToAssignRoomToServingAgentElseQueueIt({
		room,
		inquiry,
		servingAgent,
		clientAction,
	}: {
		room: Pick<IOmnichannelRoom, '_id'>;
		inquiry: ILivechatInquiryRecord;
		servingAgent: NonNullable<IOmnichannelRoom['servedBy']>;
		clientAction: boolean;
	}) {
        /* Implementation Hidden */
    }

	private async removeCurrentAgentFromRoom({
		room,
		inquiry,
	}: {
		room: Pick<IOmnichannelRoom, '_id'>;
		inquiry: ILivechatInquiryRecord;
	}): Promise<void> {
        /* Implementation Hidden */
    }
}

```