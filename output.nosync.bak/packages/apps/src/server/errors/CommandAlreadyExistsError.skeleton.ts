## File: packages/apps/src/server/errors/CommandAlreadyExistsError.ts

```typescript
export class CommandAlreadyExistsError implements Error {
	public name = 'CommandAlreadyExists';

	public message: string;

	constructor(command: string) {
        /* Implementation Hidden */
    }
}

```