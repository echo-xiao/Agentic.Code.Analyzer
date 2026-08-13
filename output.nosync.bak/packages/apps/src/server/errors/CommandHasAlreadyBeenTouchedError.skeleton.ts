## File: packages/apps/src/server/errors/CommandHasAlreadyBeenTouchedError.ts

```typescript
export class CommandHasAlreadyBeenTouchedError implements Error {
	public name = 'CommandHasAlreadyBeenTouched';

	public message: string;

	constructor(command: string) {
        /* Implementation Hidden */
    }
}

```