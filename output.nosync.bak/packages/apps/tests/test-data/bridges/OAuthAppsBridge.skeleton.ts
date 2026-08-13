## File: packages/apps/tests/test-data/bridges/OAuthAppsBridge.ts

```typescript
import type { IOAuthApp, IOAuthAppParams } from '@rocket.chat/apps-engine/definition/accessors/IOAuthApp';

import { OAuthAppsBridge } from '../../../src/server/bridges/OAuthAppsBridge';

export class TestOAuthAppsBridge extends OAuthAppsBridge {
	protected create(oAuthApp: IOAuthAppParams, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected getById(id: string, appId: string): Promise<IOAuthApp> {
        /* Implementation Hidden */
    }

	protected getByName(name: string, appId: string): Promise<Array<IOAuthApp>> {
        /* Implementation Hidden */
    }

	protected update(oAuthApp: IOAuthAppParams, id: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected delete(id: string, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected purge(appId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```