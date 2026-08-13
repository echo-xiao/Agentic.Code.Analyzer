## File: apps/meteor/app/importer-slack/server/index.ts

```typescript
import { SlackImporter } from './SlackImporter';
import { Importers } from '../../importer/server';

Importers.add({
	key: 'slack',
	name: 'Slack',
	importer: SlackImporter,
});

```