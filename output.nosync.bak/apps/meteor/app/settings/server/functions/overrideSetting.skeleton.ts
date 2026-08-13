## File: apps/meteor/app/settings/server/functions/overrideSetting.ts

```typescript
import { overrideGenerator } from './overrideGenerator';

export const overrideSetting = overrideGenerator((key: string) => process.env[key]);

```