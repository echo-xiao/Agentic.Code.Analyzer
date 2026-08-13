## File: apps/meteor/server/startup/migrations/v301.ts

```typescript
import { Permissions } from '@rocket.chat/models';

import { addMigration } from '../../lib/migrations';

addMigration({
	version: 301,
	async up() {
		await Permissions.updateOne({ _id: 'call-management', roles: { $ne: 'user' } }, { $addToSet: { roles: 'user' } });
	},
});

```