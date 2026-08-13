## File: apps/meteor/server/startup/migrations/v327.ts

```typescript
import { Settings } from '@rocket.chat/models';

import { addMigration } from '../../lib/migrations';

addMigration({
	version: 327,
	name: 'Remove FreeSwitch Settings',
	async up() {
		await Settings.deleteMany({
			_id: {
				$in: [
					'VoIP_TeamCollab_FreeSwitch',
					'VoIP_TeamCollab_FreeSwitch_Host',
					'VoIP_TeamCollab_FreeSwitch_Port',
					'VoIP_TeamCollab_FreeSwitch_Password',
					'VoIP_TeamCollab_FreeSwitch_Timeout',
					'VoIP_TeamCollab_FreeSwitch_WebSocket_Path',
				],
			},
		});
	},
});

```