## File: apps/meteor/app/importer-slack-users/server/index.ts

```typescript
import { SlackUsersImporter } from './SlackUsersImporter';
import { Importers } from '../../importer/server';

Importers.add({
	key: 'slack-users',
	name: 'Slack_Users',
	importer: SlackUsersImporter,
});

```