## File: apps/meteor/app/importer-slack-users/server/SlackUsersImporter.ts

```typescript
import fs from 'node:fs';

import type { IImport, IImportUser } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';
import { parse } from 'csv-parse/lib/sync';

import { RocketChatFile } from '../../file/server';
import { Importer, ProgressStep } from '../../importer/server';
import type { ConverterOptions } from '../../importer/server/classes/ImportDataConverter';
import type { ImporterProgress } from '../../importer/server/classes/ImporterProgress';
import type { ImporterInfo } from '../../importer/server/definitions/ImporterInfo';
import { notifyOnSettingChanged } from '../../lib/server/lib/notifyListener';

export class SlackUsersImporter extends Importer {
	private csvParser: (csv: string) => string[];

	constructor(info: ImporterInfo, importRecord: IImport, converterOptions: ConverterOptions = {}) {
        /* Implementation Hidden */
    }

	override async prepareUsingLocalFile(fullFilePath: string): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	async prepare(dataURI: string, fileName: string): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }
}

```