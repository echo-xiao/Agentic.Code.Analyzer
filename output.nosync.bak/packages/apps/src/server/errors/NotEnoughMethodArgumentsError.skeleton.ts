## File: packages/apps/src/server/errors/NotEnoughMethodArgumentsError.ts

```typescript
export class NotEnoughMethodArgumentsError implements Error {
	public readonly name: string = 'NotEnoughMethodArgumentsError';

	public readonly message: string;

	constructor(method: string, requiredCount: number, providedCount: number) {
        /* Implementation Hidden */
    }
}

```