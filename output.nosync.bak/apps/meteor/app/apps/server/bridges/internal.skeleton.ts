## File: apps/meteor/app/apps/server/bridges/internal.ts

```typescript
import type { IAppServerOrchestrator, IAppsSetting } from '@rocket.chat/apps';
import { InternalBridge } from '@rocket.chat/apps/dist/server/bridges/InternalBridge';
import type { ISetting, ISubscription } from '@rocket.chat/core-typings';
import { Settings, Subscriptions } from '@rocket.chat/models';
import { isTruthy } from '@rocket.chat/tools';

import { deasyncPromise } from '../../../../server/deasync/deasync';

export class AppInternalBridge extends InternalBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected getUsernamesOfRoomByIdSync(roomId: string): Array<string> {
        /* Implementation Hidden */
    }

	protected async getUsernamesOfRoomById(roomId: string): Promise<Array<string>> {
        /* Implementation Hidden */
    }

	protected async getWorkspacePublicKey(): Promise<IAppsSetting> {
        /* Implementation Hidden */
    }
}

```