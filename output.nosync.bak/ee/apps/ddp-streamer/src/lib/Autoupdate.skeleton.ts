## File: ee/apps/ddp-streamer/src/lib/Autoupdate.ts

```typescript
import { EventEmitter } from 'events';

import type { AutoUpdateRecord } from '@rocket.chat/core-services';

class AutoupdateSingleton extends EventEmitter {
	private versions = new Map<string, Omit<AutoUpdateRecord, '_id'>>();

	public updateVersion(record: AutoUpdateRecord): void {
        /* Implementation Hidden */
    }

	public getVersions(): Map<string, Omit<AutoUpdateRecord, '_id'>> {
        /* Implementation Hidden */
    }
}

export const Autoupdate = new AutoupdateSingleton();

```