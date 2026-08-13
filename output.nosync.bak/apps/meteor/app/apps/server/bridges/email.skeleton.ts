## File: apps/meteor/app/apps/server/bridges/email.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { EmailBridge } from '@rocket.chat/apps/dist/server/bridges/EmailBridge';
import type { IEmail } from '@rocket.chat/apps-engine/definition/email';

import * as Mailer from '../../../mailer/server/api';
import { settings } from '../../../settings/server';

export class AppEmailBridge extends EmailBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async sendEmail(email: IEmail, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```