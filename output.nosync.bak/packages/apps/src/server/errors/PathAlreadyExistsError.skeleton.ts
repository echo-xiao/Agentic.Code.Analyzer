## File: packages/apps/src/server/errors/PathAlreadyExistsError.ts

```typescript
export class PathAlreadyExistsError implements Error {
	public name = 'PathAlreadyExists';

	public message: string;

	constructor(path: string) {
        /* Implementation Hidden */
    }
}

```