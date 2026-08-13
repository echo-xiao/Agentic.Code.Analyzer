## File: packages/apps-engine/src/definition/accessors/IEnvironmentWrite.ts

```typescript
import type { IServerSettingUpdater } from './IServerSettingUpdater';
import type { ISettingUpdater } from './ISettingUpdater';

/**
 * Allows write-access to the App's settings,
 */
export interface IEnvironmentWrite {
	getSettings(): ISettingUpdater;
	getServerSettings(): IServerSettingUpdater;
}

```