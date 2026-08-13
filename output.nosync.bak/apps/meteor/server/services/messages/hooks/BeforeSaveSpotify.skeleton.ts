## File: apps/meteor/server/services/messages/hooks/BeforeSaveSpotify.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';

// look for spotify syntax (e.g.: spotify:track:1q6IK1l4qpYykOaWaLJkWG) on the message and add them to the urls array
export class BeforeSaveSpotify {
	async convertSpotifyLinks({ message }: { message: IMessage }): Promise<IMessage> {
        /* Implementation Hidden */
    }
}

```