## File: apps/meteor/server/services/messages/hooks/BeforeSaveCheckMAC.ts

```typescript
import { MeteorError, Omnichannel } from '@rocket.chat/core-services';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';
import type { IRoom, IMessage } from '@rocket.chat/core-typings';

export class BeforeSaveCheckMAC {
	async isWithinLimits({ message, room }: { message: IMessage; room: IRoom }): Promise<void> {
        /* Implementation Hidden */
    }
}

```