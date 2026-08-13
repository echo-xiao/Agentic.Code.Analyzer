## File: packages/apps/src/server/accessors/UploadCreator.ts

```typescript
import type { IUploadCreator } from '@rocket.chat/apps-engine/definition/accessors';
import type { IUpload } from '@rocket.chat/apps-engine/definition/uploads';
import type { IUploadDescriptor } from '@rocket.chat/apps-engine/definition/uploads/IUploadDescriptor';
import type { IUploadDetails } from '@rocket.chat/apps-engine/definition/uploads/IUploadDetails';

import type { AppBridges } from '../bridges';

export class UploadCreator implements IUploadCreator {
	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async uploadBuffer(buffer: Buffer, descriptor: IUploadDescriptor): Promise<IUpload> {
        /* Implementation Hidden */
    }
}

```