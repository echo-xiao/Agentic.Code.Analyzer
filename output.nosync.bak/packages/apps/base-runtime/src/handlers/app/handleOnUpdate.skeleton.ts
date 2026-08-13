## File: packages/apps/base-runtime/src/handlers/app/handleOnUpdate.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';

import { AppObjectRegistry } from '../../AppObjectRegistry';
import { AppAccessorsInstance } from '../../lib/accessors/mod';
import type { RequestContext } from '../../lib/requestContext';
import { wrapAppForRequest } from '../../lib/wrapAppForRequest';

export default async function handleOnUpdate(request: RequestContext): Promise<boolean> {
    /* Implementation Hidden */
}

```