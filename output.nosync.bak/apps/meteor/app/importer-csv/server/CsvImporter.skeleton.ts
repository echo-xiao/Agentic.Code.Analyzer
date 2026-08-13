## File: apps/meteor/app/importer-csv/server/CsvImporter.ts

```typescript
import type { IImport } from '@rocket.chat/core-typings';
import { Settings, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { parse } from 'csv-parse/lib/sync';

import { Importer, ProgressStep, ImporterWebsocket } from '../../importer/server';
import type { ConverterOptions } from '../../importer/server/classes/ImportDataConverter';
import type { ImporterProgress } from '../../importer/server/classes/ImporterProgress';
import type { ImporterInfo } from '../../importer/server/definitions/ImporterInfo';
import { addParsedContacts } from '../../importer-omnichannel-contacts/server/addParsedContacts';
import { notifyOnSettingChanged } from '../../lib/server/lib/notifyListener';

export class CsvImporter extends Importer {
	private csvParser: (csv: string) => string[][];

	constructor(info: ImporterInfo, importRecord: IImport, converterOptions: ConverterOptions = {}) {
        /* Implementation Hidden */
    }

	override async prepareUsingLocalFile(fullFilePath: string): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }
}

```