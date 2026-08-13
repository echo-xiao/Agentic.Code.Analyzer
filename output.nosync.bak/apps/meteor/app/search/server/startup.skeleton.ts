## File: apps/meteor/app/search/server/startup.ts

```typescript
import { Meteor } from 'meteor/meteor';

import { searchProviderService } from './service';

Meteor.startup(async () => {
	await searchProviderService.start();
});

```