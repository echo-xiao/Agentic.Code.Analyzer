## File: packages/core-services/src/MeteorError.ts

```typescript
export class MeteorError extends Error {
	public isClientSafe = true;

	public readonly errorType = 'Meteor.Error';

	public constructor(
		public readonly error: string | number,
		public readonly reason?: string,
		public readonly details?: any,
	) {
        /* Implementation Hidden */
    }

	public toJSON(): any {
        /* Implementation Hidden */
    }
}

export const isMeteorError = (error: any): error is MeteorError => error?.errorType === 'Meteor.Error';

```