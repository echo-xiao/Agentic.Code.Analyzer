## File: packages/apps/tests/test-data/bridges/emailBridge.ts

```typescript
import type { IEmail } from '@rocket.chat/apps-engine/definition/email';

import { EmailBridge } from '../../../src/server/bridges/EmailBridge';

export class TestsEmailBridge extends EmailBridge {
	protected sendEmail(email: IEmail, appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```