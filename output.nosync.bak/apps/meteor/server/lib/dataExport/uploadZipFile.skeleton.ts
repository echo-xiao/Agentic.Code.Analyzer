## File: apps/meteor/server/lib/dataExport/uploadZipFile.ts

```typescript
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';

import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';

import { FileUpload } from '../../../app/file-upload/server';

export const uploadZipFile = async (filePath: string, userId: IUser['_id'], exportType: 'json' | 'html'): Promise<any> => {
    /* Implementation Hidden */
};

```