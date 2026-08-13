## File: packages/apps/base-runtime/src/lib/secureFields.ts

```typescript
import type { WithSecureFields } from '@rocket.chat/apps/dist/lib/SecureFields';
import { kSecureFields } from '@rocket.chat/apps/dist/lib/SecureFields';
import type { App } from '@rocket.chat/apps-engine/definition/App';

import { AppObjectRegistry } from '../AppObjectRegistry';

export type { WithSecureFields } from '@rocket.chat/apps/dist/lib/SecureFields';

export function applySecureFields(object: WithSecureFields<Record<string, unknown>>) {
    /* Implementation Hidden */
}

```