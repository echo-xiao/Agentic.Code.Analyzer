## File: apps/meteor/server/api/lib/getTrimmedServerVersion.ts

```typescript
import { Info } from '../../../app/utils/rocketchat.info';

// Removes the patch version from the server version string
export const getTrimmedServerVersion = (): string => Info.version.replace(/(\d+\.\d+).*/, '$1');

```