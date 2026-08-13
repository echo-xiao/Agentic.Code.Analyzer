## File: apps/meteor/app/importer-omnichannel-contacts/server/ContactImporter.ts

```typescript
import fs from 'node:fs';

import type { IImport } from '@rocket.chat/core-typings';
import { parse } from 'csv-parse/lib/sync';

import { addParsedContacts } from './addParsedContacts';
import { Importer, ProgressStep, ImporterWebsocket } from '../../importer/server';
import type { ConverterOptions } from '../../importer/server/classes/ImportDataConverter';
import type { ImporterProgress } from '../../importer/server/classes/ImporterProgress';
import type { ImporterInfo } from '../../importer/server/definitions/ImporterInfo';

export class ContactImporter extends Importer {
	private csvParser: (csv: string) => string[][];

	constructor(info: ImporterInfo, importRecord: IImport, converterOptions: ConverterOptions = {}) {
        /* Implementation Hidden */
    }

	override async prepareUsingLocalFile(fullFilePath: string): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }
}

```