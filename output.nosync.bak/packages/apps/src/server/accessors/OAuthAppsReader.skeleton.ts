## File: packages/apps/src/server/accessors/OAuthAppsReader.ts

```typescript
import type { IOAuthApp } from '@rocket.chat/apps-engine/definition/accessors/IOAuthApp';
import type { IOAuthAppsReader } from '@rocket.chat/apps-engine/definition/accessors/IOAuthAppsReader';

import type { OAuthAppsBridge } from '../bridges/OAuthAppsBridge';

export class OAuthAppsReader implements IOAuthAppsReader {
	constructor(
		private readonly oauthAppsBridge: OAuthAppsBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async getOAuthAppById(id: string): Promise<IOAuthApp> {
        /* Implementation Hidden */
    }

	public async getOAuthAppByName(name: string): Promise<Array<IOAuthApp>> {
        /* Implementation Hidden */
    }
}

```