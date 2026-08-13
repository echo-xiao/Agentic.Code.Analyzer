## File: apps/meteor/app/importer-pending-files/server/index.ts

```typescript
import { PendingFileImporter } from './PendingFileImporter';
import { Importers } from '../../importer/server';

Importers.add({
	key: 'pending-files',
	name: 'Pending Files',
	visible: false,
	importer: PendingFileImporter,
});

```