## File: apps/meteor/server/startup/migrations/v324.ts

```typescript
import { Settings } from '@rocket.chat/models';

import { addMigration } from '../../lib/migrations';

addMigration({
	version: 324,
	name: 'Remove Log_View_Limit setting',
	async up() {
		await Settings.deleteOne({ _id: 'Log_View_Limit' });
	},
});

```