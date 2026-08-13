## File: packages/core-typings/src/import/ImportState.ts

```typescript
import type { IImport } from './IImport';

export type ImportStatus =
	| { state: 'none' }
	| {
			state: 'new' | 'loading' | 'ready' | 'importing' | 'done' | 'error' | 'canceled';
			operation: IImport;
	  };

```