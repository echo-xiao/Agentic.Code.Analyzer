## File: ee/packages/media-calls/src/internal/InternalCallProvider.ts

```typescript
import type { IMediaCall } from '@rocket.chat/core-typings';
import { MediaCalls } from '@rocket.chat/models';

import { BaseCallProvider } from '../base/BaseCallProvider';
import { CallRejectedError, type InternalCallParams } from '../definition/common';
import { logger } from '../logger';
import { mediaCallDirector } from '../server/CallDirector';

export class InternalCallProvider extends BaseCallProvider {
	public static async createCall(params: InternalCallParams): Promise<IMediaCall> {
        /* Implementation Hidden */
    }
}

```