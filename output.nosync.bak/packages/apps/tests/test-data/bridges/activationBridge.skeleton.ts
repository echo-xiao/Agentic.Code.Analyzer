## File: packages/apps/tests/test-data/bridges/activationBridge.ts

```typescript
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import type { ProxiedApp } from '../../../src/server/ProxiedApp';
import { AppActivationBridge } from '../../../src/server/bridges';

export class TestsActivationBridge extends AppActivationBridge {
	public async appAdded(app: ProxiedApp): Promise<void> {
        /* Implementation Hidden */
    }

	public async appUpdated(app: ProxiedApp): Promise<void> {
        /* Implementation Hidden */
    }

	public async appRemoved(app: ProxiedApp): Promise<void> {
        /* Implementation Hidden */
    }

	public async appStatusChanged(app: ProxiedApp, status: AppStatus): Promise<void> {
        /* Implementation Hidden */
    }

	protected async actionsChanged(): Promise<void> {
        /* Implementation Hidden */
    }
}

```