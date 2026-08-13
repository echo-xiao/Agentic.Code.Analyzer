## File: apps/meteor/server/lib/dataExport/processDataDownloads.ts

```typescript
import { randomUUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { access, mkdir, rm, writeFile } from 'node:fs/promises';

import type { IExportOperation, IUser, RoomType } from '@rocket.chat/core-typings';
import { Avatars, ExportOperations, UserDataFiles, Subscriptions } from '@rocket.chat/models';
import { escapeHTML } from '@rocket.chat/string-helpers';
import moment from 'moment';

import { FileUpload } from '../../../app/file-upload/server';
import { settings } from '../../../app/settings/server';
import { getURL } from '../../../app/utils/server/getURL';
import { joinPath } from '../fileUtils';
import { i18n } from '../i18n';
import { copyFileUpload } from './copyFileUpload';
import { exportRoomMessagesToFile } from './exportRoomMessagesToFile';
import { getPath } from './getPath';
import { getRoomData } from './getRoomData';
import { makeZipFile } from './makeZipFile';
import { sendEmail } from './sendEmail';
import { uploadZipFile } from './uploadZipFile';

const loadUserSubscriptions = async (_exportOperation: IExportOperation, fileType: 'json' | 'html', userId: IUser['_id']) => {
    /* Implementation Hidden */
};

const generateUserFile = async (exportOperation: IExportOperation, userData?: IUser) => {
    /* Implementation Hidden */
};

const generateUserAvatarFile = async (exportOperation: IExportOperation, userData?: IUser) => {
    /* Implementation Hidden */
};

const generateChannelsFile = async (type: 'json' | 'html', exportPath: string, exportOperation: IExportOperation) => {
    /* Implementation Hidden */
};

const isExportComplete = (exportOperation: IExportOperation) => {
    /* Implementation Hidden */
};

const continueExportOperation = async function (exportOperation: IExportOperation): Promise<void> {
    /* Implementation Hidden */
};

export async function processDataDownloads(): Promise<void> {
    /* Implementation Hidden */
}

```