## File: apps/meteor/app/search/server/search.internalService.ts

```typescript
import { api, ServiceClassInternal } from '@rocket.chat/core-services';
import { Users } from '@rocket.chat/models';

import { searchEventService } from './events';
import { searchProviderService } from './service';
import { settings } from '../../settings/server';

class Search extends ServiceClassInternal {
	protected name = 'search';

	protected override internal = true;

	constructor() {
        /* Implementation Hidden */
    }
}

const service = new Search();

settings.watch('Search.Provider', async () => {
	if (searchProviderService.activeProvider?.on) {
		api.registerService(service);
	} else {
		await api.destroyService(service);
	}
});

```