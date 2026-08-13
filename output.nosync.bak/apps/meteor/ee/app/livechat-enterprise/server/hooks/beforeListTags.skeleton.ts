## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/beforeListTags.ts

```typescript
import { LivechatTag } from '@rocket.chat/models';

import { callbacks } from '../../../../../server/lib/callbacks';

callbacks.add(
	'livechat.beforeListTags',
	() => LivechatTag.find({}, { projection: { name: 1, departments: 1 } }).toArray(),
	callbacks.priority.LOW,
	'livechat-before-list-tags',
);

```