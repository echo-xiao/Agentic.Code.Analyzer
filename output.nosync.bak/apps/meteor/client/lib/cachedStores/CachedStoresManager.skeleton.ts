## File: apps/meteor/client/lib/cachedStores/CachedStoresManager.ts

```typescript
import type { IWithManageableCache } from './CachedStore';
import { getDdpSdk } from '../sdk/ddpSdk';

class CachedStoresManager {
	private items = new Set<IWithManageableCache>();

	register(cachedCollection: IWithManageableCache) {
        /* Implementation Hidden */
    }

	clearAllCachesOnLogout() {
        /* Implementation Hidden */
    }
}

const instance = new CachedStoresManager();

getDdpSdk().account.onLogout(() => instance.clearAllCachesOnLogout());

export {
	/** @deprecated */
	instance as CachedStoresManager,
};

```