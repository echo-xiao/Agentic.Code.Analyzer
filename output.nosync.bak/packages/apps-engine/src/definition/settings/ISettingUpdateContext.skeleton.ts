## File: packages/apps-engine/src/definition/settings/ISettingUpdateContext.ts

```typescript
import type { ISetting } from './ISetting';

export interface ISettingUpdateContext {
	oldSetting: ISetting;
	newSetting: ISetting;
}

```