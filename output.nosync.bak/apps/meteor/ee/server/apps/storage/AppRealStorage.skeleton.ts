## File: apps/meteor/ee/server/apps/storage/AppRealStorage.ts

```typescript
import type { IMarketplaceInfo } from '@rocket.chat/apps/dist/server/marketplace/IMarketplaceInfo';
import { AppMetadataStorage } from '@rocket.chat/apps/dist/server/storage/AppMetadataStorage';
import type { IAppStorageItem } from '@rocket.chat/apps/dist/server/storage/IAppStorageItem';
import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import type { ISetting } from '@rocket.chat/apps-engine/definition/settings';
import type { Apps } from '@rocket.chat/models';
import { removeEmpty } from '@rocket.chat/tools';
import type { UpdateFilter } from 'mongodb';

export class AppRealStorage extends AppMetadataStorage {
	constructor(private db: typeof Apps) {
        /* Implementation Hidden */
    }

	public async create(item: IAppStorageItem): Promise<IAppStorageItem> {
        /* Implementation Hidden */
    }

	public async retrieveOne(id: string): Promise<IAppStorageItem> {
        /* Implementation Hidden */
    }

	public async retrieveAll(): Promise<Map<string, IAppStorageItem>> {
        /* Implementation Hidden */
    }

	public async retrieveAllPrivate(): Promise<Map<string, IAppStorageItem>> {
        /* Implementation Hidden */
    }

	public async remove(id: string): Promise<{ success: boolean }> {
        /* Implementation Hidden */
    }

	public async updatePartialAndReturnDocument(
		{ _id, ...item }: IAppStorageItem,
		{ unsetPermissionsGranted = false } = {},
	): Promise<IAppStorageItem> {
        /* Implementation Hidden */
    }

	public async updateStatus(_id: string, status: AppStatus): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async updateSetting(_id: string, setting: ISetting): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async updateAppInfo(_id: string, info: IAppInfo): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async updateMarketplaceInfo(_id: string, marketplaceInfo: IMarketplaceInfo[]): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```