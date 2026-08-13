## File: apps/meteor/ee/server/configuration/contact-verification.ts

```typescript
import { Meteor } from 'meteor/meteor';

import { addSettings } from '../settings/contact-verification';

Meteor.startup(async () => {
	await addSettings();
});

```