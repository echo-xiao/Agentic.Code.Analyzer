## File: apps/meteor/lib/errors/CloudWorkspaceAccessError.ts

```typescript
import { CloudWorkspaceError } from './CloudWorkspaceError';

export class CloudWorkspaceAccessError extends CloudWorkspaceError {
	override name = CloudWorkspaceAccessError.name;
}

```