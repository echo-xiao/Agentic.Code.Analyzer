## File: packages/apps/src/server/bridges/UploadBridge.ts

```typescript
import type { IUpload } from '@rocket.chat/apps-engine/definition/uploads';
import type { IUploadDetails } from '@rocket.chat/apps-engine/definition/uploads/IUploadDetails';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export abstract class UploadBridge extends BaseBridge {
	public async doGetById(id: string, appId: string): Promise<IUpload> {
        /* Implementation Hidden */
    }

	public async doGetBuffer(upload: IUpload, appId: string): Promise<Buffer> {
        /* Implementation Hidden */
    }

	public async doCreateUpload(details: IUploadDetails, buffer: Buffer, appId: string): Promise<IUpload> {
        /* Implementation Hidden */
    }

	protected abstract getById(id: string, appId: string): Promise<IUpload>;

	protected abstract getBuffer(upload: IUpload, appId: string): Promise<Buffer>;

	protected abstract createUpload(details: IUploadDetails, buffer: Buffer, appId: string): Promise<IUpload>;

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```