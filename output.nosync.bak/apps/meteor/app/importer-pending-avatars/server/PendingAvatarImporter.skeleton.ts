## File: apps/meteor/app/importer-pending-avatars/server/PendingAvatarImporter.ts

```typescript
import type { IImporterShortSelection } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { setAvatarFromServiceWithValidation } from '../../../server/lib/users/setUserAvatar';
import { Importer, ProgressStep } from '../../importer/server';
import type { ImporterProgress } from '../../importer/server/classes/ImporterProgress';

export class PendingAvatarImporter extends Importer {
	async prepareFileCount() {
        /* Implementation Hidden */
    }

	override async startImport(importSelection: IImporterShortSelection): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }
}

```