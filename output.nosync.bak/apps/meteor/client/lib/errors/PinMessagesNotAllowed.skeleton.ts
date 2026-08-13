## File: apps/meteor/client/lib/errors/PinMessagesNotAllowed.ts

```typescript
import { RocketChatError } from './RocketChatError';

export class PinMessagesNotAllowed extends RocketChatError<'error-pinning-message'> {
	constructor(message = 'Pinning messages is not allowed', details?: unknown) {
        /* Implementation Hidden */
    }
}

```