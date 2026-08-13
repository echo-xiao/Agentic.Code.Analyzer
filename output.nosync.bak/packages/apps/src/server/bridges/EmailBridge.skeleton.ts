## File: packages/apps/src/server/bridges/EmailBridge.ts

```typescript
import type { IEmail } from '@rocket.chat/apps-engine/definition/email';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class EmailBridge extends BaseBridge {
	public async doSendEmail(email: IEmail, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract sendEmail(email: IEmail, appId: string): Promise<void>;

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```