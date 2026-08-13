## File: apps/meteor/server/startup/migrations/v313.ts

```typescript
import { Settings } from '@rocket.chat/models';

import { addMigration } from '../../lib/migrations';

addMigration({
	version: 313,
	name: 'Remove "Call_Center" setting group',
	async up() {
		await Settings.deleteOne({ _id: 'Call_Center', type: 'group' });
	},
});

```