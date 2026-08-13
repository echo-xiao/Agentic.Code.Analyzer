## File: packages/apps/tests/test-data/bridges/httpBridge.ts

```typescript
import type { IHttpResponse } from '@rocket.chat/apps-engine/definition/accessors';

import type { IHttpBridgeRequestInfo } from '../../../src/server/bridges';
import { HttpBridge } from '../../../src/server/bridges';

export class TestsHttpBridge extends HttpBridge {
	public call(info: IHttpBridgeRequestInfo): Promise<IHttpResponse> {
        /* Implementation Hidden */
    }
}

```