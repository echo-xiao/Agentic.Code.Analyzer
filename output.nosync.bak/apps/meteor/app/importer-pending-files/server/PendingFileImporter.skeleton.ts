## File: apps/meteor/app/importer-pending-files/server/PendingFileImporter.ts

```typescript
import http from 'node:http';
import https from 'node:https';

import { api } from '@rocket.chat/core-services';
import type { IImport, MessageAttachment, IUpload, IImporterShortSelection } from '@rocket.chat/core-typings';
import { Messages } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';

import { FileUpload } from '../../file-upload/server';
import { Importer, ProgressStep } from '../../importer/server';
import type { ConverterOptions } from '../../importer/server/classes/ImportDataConverter';
import type { ImporterProgress } from '../../importer/server/classes/ImporterProgress';
import type { ImporterInfo } from '../../importer/server/definitions/ImporterInfo';

export class PendingFileImporter extends Importer {
	constructor(info: ImporterInfo, importRecord: IImport, converterOptions: ConverterOptions = {}) {
        /* Implementation Hidden */
    }

	async prepareFileCount() {
        /* Implementation Hidden */
    }

	override async startImport(importSelection: IImporterShortSelection): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	getMessageAttachment(file: IUpload, url: string): MessageAttachment {
        /* Implementation Hidden */
    }
}

```