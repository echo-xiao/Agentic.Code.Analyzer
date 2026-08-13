## File: apps/meteor/tests/e2e/fixtures/inject-initial-data.ts

```typescript
import type { ISetting, IUser } from '@rocket.chat/core-typings';
import { MongoClient } from 'mongodb';

import * as constants from '../config/constants';
import { createUserFixture } from './collections/users';
import { Users } from './userStates';

export default async function injectInitialData() {
    /* Implementation Hidden */
}

```