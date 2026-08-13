## File: packages/apps/src/server/errors/AppOutboundProcessError.ts

```typescript
export class AppOutboundProcessError implements Error {
	public name = 'OutboundProviderError';

	public message: string;

	constructor(message: string, where?: string) {
        /* Implementation Hidden */
    }
}

```