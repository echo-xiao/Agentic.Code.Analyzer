## File: apps/meteor/app/ui-message/client/UiKitTriggerTimeoutError.ts

```typescript
import { RocketChatError } from '../../../client/lib/errors/RocketChatError';

export class UiKitTriggerTimeoutError extends RocketChatError<'trigger-timeout'> {
	constructor(message = 'Timeout', details: { triggerId: string; appId: string }) {
        /* Implementation Hidden */
    }
}

```