## File: apps/meteor/ee/server/apps/marketplace/MarketplaceAPIClient.ts

```typescript
import { type ExtendedFetchOptions, Response, serverFetch } from '@rocket.chat/server-fetch';

import { isTesting } from './isTesting';

export class MarketplaceAPIClient {
	#fetchStrategy: (input: string, options?: ExtendedFetchOptions, allowSelfSignedCerts?: boolean) => Promise<Response>;

	#marketplaceUrl: string;

	constructor() {
        /* Implementation Hidden */
    }

	public getMarketplaceUrl(): string {
        /* Implementation Hidden */
    }

	public setStrategy(strategyName: 'default' | 'mock'): void {
        /* Implementation Hidden */
    }

	public fetch(input: string, options?: ExtendedFetchOptions, allowSelfSignedCerts?: boolean): ReturnType<typeof serverFetch> {
        /* Implementation Hidden */
    }
}

/**
 * Provide mocked HTTP responses for supported Marketplace API endpoints.
 *
 * This allows us to prevent actual calls to Marketplace service
 * during TEST_MODE (CI, local tests, etc.), i.e., remove our dependency
 * an external unrelated service
 *
 * The response content provided has minimal structure to allow for the program
 * to not crash by receiving something different from the expected structure
 *
 * @param input - The request URL or path used to determine which mock response to return
 * @returns A `Response` with status 200 and a JSON body corresponding to the requested marketplace endpoint
 * @throws Error when `input` does not match any supported mock endpoint
 */
function mockMarketplaceFetch(input: string, _options?: ExtendedFetchOptions, _allowSelfSignedCerts?: boolean): Promise<Response> {
    /* Implementation Hidden */
}

```