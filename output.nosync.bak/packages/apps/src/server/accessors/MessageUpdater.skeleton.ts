## File: packages/apps/src/server/accessors/MessageUpdater.ts

```typescript
import type { IMessageUpdater } from '@rocket.chat/apps-engine/definition/accessors/IMessageUpdater';
import type { Reaction } from '@rocket.chat/apps-engine/definition/messages';

import type { AppBridges } from '../bridges';

export class MessageUpdater implements IMessageUpdater {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async addReaction(messageId: string, userId: string, reaction: Reaction): Promise<void> {
        /* Implementation Hidden */
    }

	public async removeReaction(messageId: string, userId: string, reaction: Reaction): Promise<void> {
        /* Implementation Hidden */
    }
}

```