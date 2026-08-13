## File: packages/apps/src/server/errors/VideoConfProviderNotRegisteredError.ts

```typescript
export class VideoConfProviderNotRegisteredError implements Error {
	public name = 'VideoConfProviderNotRegistered';

	public message: string;

	constructor(providerName: string) {
        /* Implementation Hidden */
    }
}

```