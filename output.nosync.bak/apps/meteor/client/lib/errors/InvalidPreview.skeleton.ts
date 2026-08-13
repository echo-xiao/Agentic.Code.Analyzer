## File: apps/meteor/client/lib/errors/InvalidPreview.ts

```typescript
import { RocketChatError } from './RocketChatError';

export class InvalidPreview extends RocketChatError<'error-invalid-preview'> {
	constructor(message = 'Preview Item must have an id, type, and value.', details?: string) {
        /* Implementation Hidden */
    }
}

```