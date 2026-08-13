## File: packages/apps/src/server/accessors/ModerationModify.ts

```typescript
import type { IModerationModify } from '@rocket.chat/apps-engine/definition/accessors';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { ModerationBridge } from '../bridges';

export class ModerationModify implements IModerationModify {
	constructor(
		private moderationBridge: ModerationBridge,
		_appId: string,
	) {
        /* Implementation Hidden */
    }

	public report(messageId: string, description: string, userId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public dismissReportsByMessageId(messageId: IMessage['id'], reason: string, action: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public dismissReportsByUserId(userId: IUser['id'], reason: string, action: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```