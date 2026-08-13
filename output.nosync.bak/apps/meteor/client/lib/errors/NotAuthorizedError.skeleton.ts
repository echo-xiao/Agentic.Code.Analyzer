## File: apps/meteor/client/lib/errors/NotAuthorizedError.ts

```typescript
import { RocketChatError } from './RocketChatError';

export class NotAuthorizedError extends RocketChatError<'not-authorized'> {
	constructor(message = 'Not authorized', details?: unknown) {
        /* Implementation Hidden */
    }
}

```