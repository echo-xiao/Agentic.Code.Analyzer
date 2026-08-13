## File: apps/meteor/server/startup/migrations/v298.ts

```typescript
import { Integrations } from '@rocket.chat/models';

import { addMigration } from '../../lib/migrations';

addMigration({
	version: 298,
	name: 'Set overrideDestinationChannelEnabled for all incoming webhook integrations',
	async up() {
		await Integrations.updateMany(
			{
				type: 'webhook-incoming',
			},
			{
				$set: {
					overrideDestinationChannelEnabled: true,
				},
			},
		);
	},
});

```