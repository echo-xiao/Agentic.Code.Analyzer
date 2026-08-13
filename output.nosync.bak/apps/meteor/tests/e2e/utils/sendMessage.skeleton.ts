## File: apps/meteor/tests/e2e/utils/sendMessage.ts

```typescript
import type { APIRequestContext } from 'playwright-core';

import type { BaseTest } from './test';
import { BASE_API_URL } from '../config/constants';
import type { IUserState } from '../fixtures/userStates';

export const sendMessageFromUser = async (request: APIRequestContext, user: IUserState, rid: string, message: string) => {
    /* Implementation Hidden */
};

export const sendFillerMessages = async (api: BaseTest['api'], rid: string, count = 50, batchSize = 10) => {
    /* Implementation Hidden */
};

```