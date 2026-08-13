## File: apps/meteor/client/lib/errors/RocketChatError.ts

```typescript
export abstract class RocketChatError<TErrorId extends string, TDetails = unknown> extends Error {
	public readonly error: TErrorId;

	public readonly reason?: string;

	public readonly details?: TDetails;

	constructor(error: TErrorId, reason?: string, details?: TDetails) {
        /* Implementation Hidden */
    }
}

```