## File: packages/apps/src/server/bridges/ThreadBridge.ts

```typescript
import type { ITypingOptions } from '@rocket.chat/apps-engine/definition/accessors/INotifier';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export interface ITypingDescriptor extends ITypingOptions {
	isTyping: boolean;
}

export abstract class ThreadBridge extends BaseBridge {
	public async doGetById(messageId: string, appId: string): Promise<Array<IMessage>> {
        /* Implementation Hidden */
    }

	protected abstract getById(messageId: string, appId: string): Promise<Array<IMessage>>;

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```