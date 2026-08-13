## File: apps/meteor/app/version-check/server/functions/getNewUpdates.ts

```typescript
import os from 'node:os';

import { Settings } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { check, Match } from 'meteor/check';

import { getWorkspaceAccessToken } from '../../../cloud/server';
import { Info } from '../../../utils/rocketchat.info';

/** @deprecated */

export const getNewUpdates = async () => {
    /* Implementation Hidden */
};

```