## File: apps/meteor/server/lib/dataExport/copyFileUpload.ts

```typescript
import type { FileProp } from '@rocket.chat/core-typings';
import { Uploads } from '@rocket.chat/models';

import { FileUpload } from '../../../app/file-upload/server';
import { joinPath } from '../fileUtils';

export const copyFileUpload = async (attachmentData: Pick<FileProp, '_id' | 'name'>, assetsPath: string): Promise<void> => {
    /* Implementation Hidden */
};

```