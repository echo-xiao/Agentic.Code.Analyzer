## File: packages/apps/src/server/bridges/AppActivationBridge.ts

```typescript
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import type { ProxiedApp } from '../ProxiedApp';
import { BaseBridge } from './BaseBridge';

export abstract class AppActivationBridge extends BaseBridge {
	public async doAppAdded(app: ProxiedApp): Promise<void> {
        /* Implementation Hidden */
    }

	public async doAppUpdated(app: ProxiedApp): Promise<void> {
        /* Implementation Hidden */
    }

	public async doAppRemoved(app: ProxiedApp): Promise<void> {
        /* Implementation Hidden */
    }

	public async doAppStatusChanged(app: ProxiedApp, status: AppStatus): Promise<void> {
        /* Implementation Hidden */
    }

	public async doActionsChanged(): Promise<void> {
        /* Implementation Hidden */
    }

	protected abstract appAdded(app: ProxiedApp): Promise<void>;

	protected abstract appUpdated(app: ProxiedApp): Promise<void>;

	protected abstract appRemoved(app: ProxiedApp): Promise<void>;

	protected abstract appStatusChanged(app: ProxiedApp, status: AppStatus): Promise<void>;

	protected abstract actionsChanged(): Promise<void>;
}

```