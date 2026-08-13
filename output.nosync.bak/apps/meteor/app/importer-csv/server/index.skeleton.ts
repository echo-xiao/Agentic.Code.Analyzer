## File: apps/meteor/app/importer-csv/server/index.ts

```typescript
import { CsvImporter } from './CsvImporter';
import { Importers } from '../../importer/server';

Importers.add({
	key: 'csv',
	name: 'CSV',
	importer: CsvImporter,
});

```