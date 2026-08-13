## File: packages/apps/src/server/errors/VideoConfProviderAlreadyExistsError.ts

```typescript
export class VideoConfProviderAlreadyExistsError implements Error {
	public name = 'VideoConfProviderAlreadyExists';

	public message: string;

	constructor(name: string) {
        /* Implementation Hidden */
    }
}

```