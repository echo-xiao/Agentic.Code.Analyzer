## File: ee/packages/media-calls/src/base/BaseCallProvider.ts

```typescript
import type { IMediaCall } from '@rocket.chat/core-typings';
import type { ClientMediaSignalBody } from '@rocket.chat/media-signaling';

import { logger } from '../logger';

export class BaseCallProvider {
	public get callId(): string {
		return this.call._id;
	}

	constructor(public readonly call: IMediaCall) {
        /* Implementation Hidden */
    }

	public async reactToCallChanges(params: { dtmf?: ClientMediaSignalBody<'dtmf'> }): Promise<void> {
        /* Implementation Hidden */
    }
}

```