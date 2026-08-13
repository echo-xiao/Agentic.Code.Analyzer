## File: packages/apps/src/server/bridges/AppDetailChangesBridge.ts

```typescript
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import { BaseBridge } from './BaseBridge';

/**
 * An abstract class which will contain various methods related to Apps
 * which are called for various inner detail working changes. This
 * allows for us to notify various external components of internal
 * changes.
 */
export abstract class AppDetailChangesBridge extends BaseBridge {
	public doOnAppSettingsChange(appId: string, setting: ISetting): void {
        /* Implementation Hidden */
    }

	protected abstract onAppSettingsChange(appId: string, setting: ISetting): void;
}

```