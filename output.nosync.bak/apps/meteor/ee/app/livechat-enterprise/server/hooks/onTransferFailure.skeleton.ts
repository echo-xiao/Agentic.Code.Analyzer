## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/onTransferFailure.ts

```typescript
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import type { IRoom, ILivechatVisitor, ILivechatDepartment, TransferData, AtLeast } from '@rocket.chat/core-typings';
import { LivechatDepartment } from '@rocket.chat/models';

import { forwardRoomToDepartment } from '../../../../../app/livechat/server/lib/Helper';
import { settings } from '../../../../../app/settings/server';
import { callbacks } from '../../../../../server/lib/callbacks';
import { cbLogger } from '../lib/logger';

const onTransferFailure = async (
	room: IRoom,
	{
		guest,
		transferData,
		department,
	}: {
		guest: ILivechatVisitor;
		transferData: TransferData;
		department: AtLeast<ILivechatDepartment, '_id' | 'fallbackForwardDepartment' | 'name'>;
	},
) => {
    /* Implementation Hidden */
};

callbacks.add('livechat:onTransferFailure', onTransferFailure, callbacks.priority.HIGH);

```