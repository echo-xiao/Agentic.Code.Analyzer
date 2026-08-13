## File: packages/apps/src/server/accessors/UploadRead.ts

```typescript
import type { IUploadRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { IUpload } from '@rocket.chat/apps-engine/definition/uploads';

import type { UploadBridge } from '../bridges/UploadBridge';

export class UploadRead implements IUploadRead {
	constructor(
		private readonly uploadBridge: UploadBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public getById(id: string): Promise<IUpload> {
        /* Implementation Hidden */
    }

	public getBuffer(upload: IUpload): Promise<Buffer> {
        /* Implementation Hidden */
    }

	public async getBufferById(id: string): Promise<Buffer> {
        /* Implementation Hidden */
    }
}

```