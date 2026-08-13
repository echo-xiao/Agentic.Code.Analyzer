## File: apps/meteor/client/meteor/minimongo/MinimongoError.ts

```typescript
export class MinimongoError extends Error {
	constructor(message: string, context?: { field: number | string | symbol }) {
        /* Implementation Hidden */
    }

	public setPropertyError: boolean | undefined;
}

```