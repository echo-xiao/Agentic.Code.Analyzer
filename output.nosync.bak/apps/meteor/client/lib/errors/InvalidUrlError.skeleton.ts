## File: apps/meteor/client/lib/errors/InvalidUrlError.ts

```typescript
import { RocketChatError } from './RocketChatError';

export class InvalidUrlError extends RocketChatError<'invalid-url'> {
	constructor(message = 'Invalid url', details?: string) {
        /* Implementation Hidden */
    }
}

```