## File: packages/apps/base-runtime/src/handlers/app/handleOnEnable.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';

import { AppObjectRegistry } from '../../AppObjectRegistry';
import { AppAccessorsInstance } from '../../lib/accessors/mod';
import type { RequestContext } from '../../lib/requestContext';
import { wrapAppForRequest } from '../../lib/wrapAppForRequest';

export default function handleOnEnable(request: RequestContext): Promise<boolean> {
    /* Implementation Hidden */
}

```