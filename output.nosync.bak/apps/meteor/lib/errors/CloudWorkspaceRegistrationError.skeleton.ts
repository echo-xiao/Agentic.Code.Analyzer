## File: apps/meteor/lib/errors/CloudWorkspaceRegistrationError.ts

```typescript
import { CloudWorkspaceError } from './CloudWorkspaceError';

export class CloudWorkspaceRegistrationError extends CloudWorkspaceError {
	override name = CloudWorkspaceRegistrationError.name;
}

```