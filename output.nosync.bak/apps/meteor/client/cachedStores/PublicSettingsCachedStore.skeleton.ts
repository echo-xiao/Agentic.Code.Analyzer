## File: apps/meteor/client/cachedStores/PublicSettingsCachedStore.ts

```typescript
import type { ISetting } from '@rocket.chat/core-typings';

import { PublicCachedStore } from '../lib/cachedStores/CachedStore';
import { PublicSettings } from '../stores';

class PublicSettingsCachedStore extends PublicCachedStore<ISetting> {
	constructor() {
        /* Implementation Hidden */
    }
}

const instance = new PublicSettingsCachedStore();

export { instance as PublicSettingsCachedStore };

```