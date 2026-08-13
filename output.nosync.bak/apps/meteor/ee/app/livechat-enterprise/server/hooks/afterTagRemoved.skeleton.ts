## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/afterTagRemoved.ts

```typescript
import { CannedResponse } from '@rocket.chat/models';

import { callbacks } from '../../../../../server/lib/callbacks';

callbacks.add(
	'livechat.afterTagRemoved',
	async (tag) => {
		const { name } = tag;

		await CannedResponse.removeTagFromCannedResponses(name);
	},
	callbacks.priority.MEDIUM,
	'on-tag-removed-remove-references',
);

```