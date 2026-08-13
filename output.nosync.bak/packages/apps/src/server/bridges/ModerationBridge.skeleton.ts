## File: packages/apps/src/server/bridges/ModerationBridge.ts

```typescript
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class ModerationBridge extends BaseBridge {
	public async doReport(messageId: IMessage['id'], description: string, userId: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doDismissReportsByMessageId(messageId: IMessage['id'], reason: string, action: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doDismissReportsByUserId(userId: IUser['id'], reason: string, action: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract report(messageId: string, description: string, userId: string, appId: string): Promise<void>;

	protected abstract dismissReportsByMessageId(messageId: string, reason: string, action: string, appId: string): Promise<void>;

	protected abstract dismissReportsByUserId(userId: string, reason: string, action: string, appId: string): Promise<void>;

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```