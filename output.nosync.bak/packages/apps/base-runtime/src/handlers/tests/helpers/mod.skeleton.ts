## File: packages/apps/base-runtime/src/handlers/tests/helpers/mod.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';

import { Logger } from '../../../lib/logger';
import type { RequestDescriptor } from '../../../lib/messenger';
import type { RequestContext } from '../../../lib/requestContext';

export function createMockRequest({ method, params }: RequestDescriptor): RequestContext {
    /* Implementation Hidden */
}

export function createMockApp(): App {
    /* Implementation Hidden */
}

```