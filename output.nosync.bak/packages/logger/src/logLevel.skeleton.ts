## File: packages/logger/src/logLevel.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

export type LogLevelSetting = '0' | '1' | '2';

export const logLevel = new Emitter<{
	changed: LogLevelSetting;
}>();

```