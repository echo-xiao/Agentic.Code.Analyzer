## File: packages/apps/src/server/errors/CompilerError.ts

```typescript
export class CompilerError implements Error {
	public name = 'CompilerError';

	public message: string;

	constructor(detail: string) {
        /* Implementation Hidden */
    }
}

```