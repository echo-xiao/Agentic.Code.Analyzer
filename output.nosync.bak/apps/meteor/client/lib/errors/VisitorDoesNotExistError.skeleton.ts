## File: apps/meteor/client/lib/errors/VisitorDoesNotExistError.ts

```typescript
import { RocketChatError } from './RocketChatError';

export class VisitorDoesNotExistError extends RocketChatError<'visitor-does-not-exist'> {
	constructor(message = 'Visitor does not exist', details?: string) {
        /* Implementation Hidden */
    }
}

```