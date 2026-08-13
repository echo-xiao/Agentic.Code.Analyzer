## File: packages/apps/tests/test-data/storage/logStorage.ts

```typescript
import type { ILoggerStorageEntry } from '../../../src/server/logging';
import type { IAppLogStorageFindOptions } from '../../../src/server/storage';
import { AppLogStorage } from '../../../src/server/storage';

export class TestsAppLogStorage extends AppLogStorage {
	constructor() {
        /* Implementation Hidden */
    }

	public findPaginated(
		query: { [field: string]: any },
		options?: IAppLogStorageFindOptions,
	): Promise<{ logs: ILoggerStorageEntry[]; total: number }> {
        /* Implementation Hidden */
    }

	public storeEntries(logEntry: ILoggerStorageEntry): Promise<ILoggerStorageEntry> {
        /* Implementation Hidden */
    }

	public getEntriesFor(appId: string): Promise<Array<ILoggerStorageEntry>> {
        /* Implementation Hidden */
    }

	public removeEntriesFor(appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```