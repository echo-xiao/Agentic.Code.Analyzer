## File: apps/meteor/lib/errors/CloudWorkspaceLicenseError.ts

```typescript
import { CloudWorkspaceError } from './CloudWorkspaceError';

export class CloudWorkspaceLicenseError extends CloudWorkspaceError {
	override name = CloudWorkspaceLicenseError.name;
}

```