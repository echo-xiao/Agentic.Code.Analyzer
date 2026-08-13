## File: apps/meteor/ee/server/configuration/voip.ts

```typescript
import { MediaCall } from '@rocket.chat/core-services';
import { License } from '@rocket.chat/license';

import { addSettings } from '../settings/voip';

License.onValidateLicense(async () => {
	await addSettings();

	await MediaCall.hangupExpiredCalls();
});

```