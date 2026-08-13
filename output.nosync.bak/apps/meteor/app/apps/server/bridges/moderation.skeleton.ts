## File: apps/meteor/app/apps/server/bridges/moderation.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { ModerationBridge } from '@rocket.chat/apps/dist/server/bridges/ModerationBridge';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import { ModerationReports } from '@rocket.chat/models';

import { reportMessage } from '../../../../server/lib/moderation/reportMessage';

export class AppModerationBridge extends ModerationBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async report(messageId: IMessage['id'], description: string, userId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async dismissReportsByMessageId(messageId: IMessage['id'], reason: string, action: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async dismissReportsByUserId(userId: IUser['id'], reason: string, action: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```