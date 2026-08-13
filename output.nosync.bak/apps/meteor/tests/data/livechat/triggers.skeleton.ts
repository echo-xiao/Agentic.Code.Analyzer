## File: apps/meteor/tests/data/livechat/triggers.ts

```typescript
import { faker } from '@faker-js/faker';
import type { ILivechatTrigger } from '@rocket.chat/core-typings';

import { api, credentials, request } from '../api-data';
import type { DummyResponse } from './utils';

export const createTrigger = (name: string): Promise<boolean> => {
    /* Implementation Hidden */
};

export const fetchTriggers = (): Promise<ILivechatTrigger[]> => {
    /* Implementation Hidden */
};

```