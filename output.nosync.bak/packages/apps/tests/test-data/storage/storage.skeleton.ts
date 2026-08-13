## File: packages/apps/tests/test-data/storage/storage.ts

```typescript
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';

import type { IMarketplaceInfo } from '../../../src/server/marketplace';
import type { IAppStorageItem } from '../../../src/server/storage';
import { AppMetadataStorage } from '../../../src/server/storage';
import { AppInstallationSource } from '../../../src/server/storage/IAppStorageItem';

export class TestsAppStorage extends AppMetadataStorage {
	private db = new Map<string, IAppStorageItem>();

	constructor() {
        /* Implementation Hidden */
    }

	public create(item: IAppStorageItem): Promise<IAppStorageItem> {
        /* Implementation Hidden */
    }

	public retrieveOne(id: string): Promise<IAppStorageItem | null> {
        /* Implementation Hidden */
    }

	public retrieveAll(): Promise<Map<string, IAppStorageItem>> {
        /* Implementation Hidden */
    }

	public retrieveAllPrivate(): Promise<Map<string, IAppStorageItem>> {
        /* Implementation Hidden */
    }

	public clear(): void {
        /* Implementation Hidden */
    }

	public remove(id: string): Promise<{ success: boolean }> {
        /* Implementation Hidden */
    }

	public updatePartialAndReturnDocument(
		item: Partial<IAppStorageItem>,
		_options?: { unsetPermissionsGranted?: boolean },
	): Promise<IAppStorageItem> {
        /* Implementation Hidden */
    }

	public updateStatus(id: string, status: AppStatus): Promise<boolean> {
        /* Implementation Hidden */
    }

	public updateSetting(id: string, setting: ISetting): Promise<boolean> {
        /* Implementation Hidden */
    }

	public updateAppInfo(id: string, info: IAppInfo): Promise<boolean> {
        /* Implementation Hidden */
    }

	public updateMarketplaceInfo(id: string, marketplaceInfo: IMarketplaceInfo[]): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```