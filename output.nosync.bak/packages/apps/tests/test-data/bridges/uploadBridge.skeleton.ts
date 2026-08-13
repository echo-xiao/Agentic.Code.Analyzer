## File: packages/apps/tests/test-data/bridges/uploadBridge.ts

```typescript
import type { IUpload } from '@rocket.chat/apps-engine/definition/uploads';
import type { IUploadDetails } from '@rocket.chat/apps-engine/definition/uploads/IUploadDetails';

import { UploadBridge } from '../../../src/server/bridges/UploadBridge';

export class TestUploadBridge extends UploadBridge {
	public getById(id: string, appId: string): Promise<IUpload> {
        /* Implementation Hidden */
    }

	public getBuffer(upload: IUpload, appId: string): Promise<Buffer> {
        /* Implementation Hidden */
    }

	public createUpload(details: IUploadDetails, buffer: Buffer, appId: string): Promise<IUpload> {
        /* Implementation Hidden */
    }
}

```