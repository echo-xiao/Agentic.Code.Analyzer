## File: apps/meteor/app/search/server/service/SearchProviderService.ts

```typescript
import { withDebouncing } from '../../../../lib/utils/highOrderFunctions';
import { settings, settingsRegistry } from '../../../settings/server';
import { SearchLogger } from '../logger/logger';
import type { SearchProvider } from '../model/SearchProvider';

export class SearchProviderService {
	public providers: Record<string, SearchProvider> = {};

	public activeProvider?: SearchProvider;

	/**
	 * Stop current provider (if there is one) and start the new
	 * @param id the id of the provider which should be started
	 */
	async use(id: SearchProvider['key']) {
        /* Implementation Hidden */
    }

	/**
	 * Registers a search provider on system startup
	 */
	register(provider: SearchProvider) {
        /* Implementation Hidden */
    }

	/**
	 * Starts the service (loads provider settings for admin ui, add lister not setting changes, enable current provider
	 */
	async start() {
        /* Implementation Hidden */
    }
}

```