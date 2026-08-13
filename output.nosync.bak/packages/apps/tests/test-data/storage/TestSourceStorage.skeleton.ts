## File: packages/apps/tests/test-data/storage/TestSourceStorage.ts

```typescript
import type { IAppStorageItem } from '../../../src/server/storage';
import { AppSourceStorage } from '../../../src/server/storage';

export class TestSourceStorage extends AppSourceStorage {
	public async store(item: IAppStorageItem, zip: Buffer): Promise<string> {
        /* Implementation Hidden */
    }

	public async fetch(item: IAppStorageItem): Promise<Buffer> {
        /* Implementation Hidden */
    }

	public async update(item: IAppStorageItem, zip: Buffer): Promise<string> {
        /* Implementation Hidden */
    }

	public async remove(item: IAppStorageItem): Promise<void> {
        /* Implementation Hidden */
    }
}

```