## File: packages/apps/src/server/bridges/ListenerBridge.ts

```typescript
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { AppInterface } from '@rocket.chat/apps-engine/definition/metadata';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';

import { BaseBridge } from './BaseBridge';

export abstract class ListenerBridge extends BaseBridge {
	public async doMessageEvent(int: AppInterface, message: IMessage): Promise<void | boolean | IMessage> {
        /* Implementation Hidden */
    }

	public async doRoomEvent(int: AppInterface, room: IRoom): Promise<void | boolean | IRoom> {
        /* Implementation Hidden */
    }

	protected abstract messageEvent(int: AppInterface, message: IMessage): Promise<void | boolean | IMessage>;

	protected abstract roomEvent(int: AppInterface, room: IRoom): Promise<void | boolean | IRoom>;
}

```