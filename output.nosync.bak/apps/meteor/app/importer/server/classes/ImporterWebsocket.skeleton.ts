## File: apps/meteor/app/importer/server/classes/ImporterWebsocket.ts

```typescript
import type { IImportProgress } from '@rocket.chat/core-typings';

import type { IStreamer } from '../../../../server/modules/streamer/types';
import notifications from '../../../notifications/server/lib/Notifications';

class ImporterWebsocketDef {
	private streamer: IStreamer<'importers'>;

	constructor() {
        /* Implementation Hidden */
    }

	/**
	 * Called when the progress is updated.
	 *
	 * @param {Progress} progress The progress of the import.
	 */
	progressUpdated(progress: { rate: number } | IImportProgress) {
        /* Implementation Hidden */
    }
}

export const ImporterWebsocket = new ImporterWebsocketDef();

```