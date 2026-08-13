## File: apps/meteor/server/startup/migrations/v303.ts

```typescript
import { Users } from '@rocket.chat/models';

import { addMigration } from '../../lib/migrations';

addMigration({
	version: 303,
	name: 'Add roles field and set empty for users without it',
	async up() {
		await Users.updateMany(
			{
				roles: { $exists: false },
			},
			{ $set: { roles: [] } },
		);
	},
});

```