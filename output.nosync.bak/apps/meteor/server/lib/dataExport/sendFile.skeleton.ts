## File: apps/meteor/server/lib/dataExport/sendFile.ts

```typescript
import { mkdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path, { join } from 'node:path';

import type { IUser } from '@rocket.chat/core-typings';

import { getURL } from '../../../app/utils/server/getURL';
import { i18n } from '../i18n';
import { copyFileUpload } from './copyFileUpload';
import { exportRoomMessagesToFile } from './exportRoomMessagesToFile';
import { getPath } from './getPath';
import { getRoomData } from './getRoomData';
import { makeZipFile } from './makeZipFile';
import { sendEmail } from './sendEmail';
import { uploadZipFile } from './uploadZipFile';

type ExportFile = {
	rid: string;
	dateFrom: Date;
	dateTo: Date;
	format: 'html' | 'json';
};

export const sendFile = async (data: ExportFile, user: IUser): Promise<void> => {
    /* Implementation Hidden */
};

```