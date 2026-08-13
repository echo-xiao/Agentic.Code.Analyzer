## File: apps/meteor/server/services/push/tokenManagement/registerPushToken.ts

```typescript
import type { IPushToken, Optional } from '@rocket.chat/core-typings';
import { PushToken } from '@rocket.chat/models';

import { findDocumentToUpdate } from './findDocumentToUpdate';
import { logger } from '../logger';

export type PushTokenData = Optional<
	Pick<IPushToken, '_id' | 'token' | 'authToken' | 'appName' | 'userId' | 'metadata' | 'voipToken'>,
	'_id' | 'metadata'
>;

function canModifyTokenDocument(doc: IPushToken, data: Partial<IPushToken>): boolean {
    /* Implementation Hidden */
}

async function insertToken(data: PushTokenData): Promise<IPushToken['_id']> {
    /* Implementation Hidden */
}

async function updateToken(doc: IPushToken, data: PushTokenData): Promise<IPushToken['_id']> {
    /* Implementation Hidden */
}

export async function registerPushToken(data: PushTokenData): Promise<IPushToken['_id']> {
    /* Implementation Hidden */
}

```