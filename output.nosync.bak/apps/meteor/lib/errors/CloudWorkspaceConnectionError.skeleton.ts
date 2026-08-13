## File: apps/meteor/lib/errors/CloudWorkspaceConnectionError.ts

```typescript
import { CloudWorkspaceError } from './CloudWorkspaceError';

export class CloudWorkspaceConnectionError extends CloudWorkspaceError {
	override name = CloudWorkspaceConnectionError.name;
}

```