## File: apps/meteor/app/lib/server/lib/afterSaveMessage.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import type { IMessage, IUser, IRoom } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Rooms } from '@rocket.chat/models';

import { callbacks } from '../../../../server/lib/callbacks';
import type { SendMessageOptions } from '../../../../server/lib/messages/sendMessage';

export async function afterSaveMessage(
	message: IMessage,
	room: IRoom,
	user: IUser,
	{
		roomUpdater,
		options,
	}: {
		roomUpdater?: Updater<IRoom>;
		options?: SendMessageOptions;
	} = {},
): Promise<IMessage> {
    /* Implementation Hidden */
}

export function afterSaveMessageAsync(
	message: IMessage,
	room: IRoom,
	user: IUser,
	{
		roomUpdater: updater,
		options,
	}: {
		roomUpdater?: Updater<IRoom>;
		options?: SendMessageOptions;
	} = {},
): void {
    /* Implementation Hidden */
}

```