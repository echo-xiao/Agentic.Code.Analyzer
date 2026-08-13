## File: packages/apps/base-runtime/src/handlers/app/handleSetStatus.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';
import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import { AppObjectRegistry } from '../../AppObjectRegistry';
import type { RequestContext } from '../../lib/requestContext';
import { wrapAppForRequest } from '../../lib/wrapAppForRequest';

export default async function handleSetStatus(request: RequestContext): Promise<null> {
    /* Implementation Hidden */
}

```