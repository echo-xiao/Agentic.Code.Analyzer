## File: apps/meteor/tests/data/livechat/visitor.ts

```typescript
import type { ILivechatVisitor } from '@rocket.chat/core-typings';
import { expect } from 'chai';

import { api, credentials, request } from '../api-data';

export const getLivechatVisitorByToken = async (token: string): Promise<ILivechatVisitor> => {
    /* Implementation Hidden */
};

```