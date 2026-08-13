## File: apps/meteor/app/livechat/server/lib/transfer.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { ILivechatDepartment, ILivechatVisitor, IOmnichannelRoom, TransferData } from '@rocket.chat/core-typings';
import { Users, LivechatRooms, LivechatVisitors, LivechatDepartment } from '@rocket.chat/models';

import { normalizeTransferredByData } from './Helper';
import { RoutingManager } from './RoutingManager';
import { livechatLogger } from './logger';

export async function saveTransferHistory(room: IOmnichannelRoom, transferData: TransferData) {
    /* Implementation Hidden */
}

export async function forwardOpenChats(userId: string) {
    /* Implementation Hidden */
}

export async function transfer(room: IOmnichannelRoom, guest: ILivechatVisitor, transferData: TransferData) {
    /* Implementation Hidden */
}

```