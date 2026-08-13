## File: packages/apps/src/server/errors/MustExtendAppError.ts

```typescript
export class MustExtendAppError implements Error {
	public name = 'MustExtendApp';

	public message = 'App must extend the "App" abstract class.';
}

```