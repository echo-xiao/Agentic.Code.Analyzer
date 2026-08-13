## File: apps/meteor/client/lib/customOAuth/CustomOAuthError.ts

```typescript
import { RocketChatError } from '../errors/RocketChatError';

type CustomOAuthErrorDetails = {
	service?: string;
};

export class CustomOAuthError extends RocketChatError<'custom-oauth-error', CustomOAuthErrorDetails> {
	constructor(reason?: string, details?: CustomOAuthErrorDetails) {
        /* Implementation Hidden */
    }
}

```