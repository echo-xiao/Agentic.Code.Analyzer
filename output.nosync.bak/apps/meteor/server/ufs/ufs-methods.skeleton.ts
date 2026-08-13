## File: apps/meteor/server/ufs/ufs-methods.ts

```typescript
import fs from 'node:fs';

import type { IUpload } from '@rocket.chat/core-typings';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import type { ClientSession } from 'mongodb';

import { UploadFS } from './ufs';

export async function ufsComplete(fileId: string, storeName: string, options?: { session?: ClientSession }): Promise<IUpload> {
    /* Implementation Hidden */
}

```