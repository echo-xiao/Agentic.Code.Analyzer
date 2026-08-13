## File: apps/meteor/app/importer/server/classes/ImportersContainer.ts

```typescript
import type { ImporterInfo } from '../definitions/ImporterInfo';

/** Container class which holds all of the importer details. */
export class ImportersContainer {
	private importers: Map<ImporterInfo['key'], ImporterInfo>;

	constructor() {
        /* Implementation Hidden */
    }

	add({ key, name, importer, visible }: Omit<ImporterInfo, 'visible'> & { visible?: boolean }) {
        /* Implementation Hidden */
    }

	get(key: string): ImporterInfo | undefined {
        /* Implementation Hidden */
    }

	getAllVisible(): ImporterInfo[] {
        /* Implementation Hidden */
    }
}

```