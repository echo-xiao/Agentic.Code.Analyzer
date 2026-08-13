## File: packages/apps/src/server/errors/MustContainFunctionError.ts

```typescript
export class MustContainFunctionError implements Error {
	public name = 'MustContainFunction';

	public message: string;

	constructor(fileName: string, funcName: string) {
        /* Implementation Hidden */
    }
}

```