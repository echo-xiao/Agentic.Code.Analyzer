## File: apps/meteor/client/cachedStores/PrivateSettingsCachedStore.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';

import { sdk } from '../../app/utils/client/lib/SDKClient';
import { PrivateCachedStore } from '../lib/cachedStores/CachedStore';
import { PrivateSettings } from '../stores';

class PrivateSettingsCachedStore extends PrivateCachedStore<ISetting> {
	constructor() {
        /* Implementation Hidden */
    }

	override setupListener() {
        /* Implementation Hidden */
    }
}

const instance = new PrivateSettingsCachedStore();

export { instance as PrivateSettingsCachedStore };

```