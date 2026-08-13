## File: packages/apps/src/server/accessors/ExternalComponentsExtend.ts

```typescript
import type { IExternalComponentsExtend } from '@rocket.chat/apps-engine/definition/accessors';
import type { IExternalComponent } from '@rocket.chat/apps-engine/definition/externalComponent/IExternalComponent';

import type { AppExternalComponentManager } from '../managers/AppExternalComponentManager';

export class ExternalComponentsExtend implements IExternalComponentsExtend {
	constructor(
		private readonly manager: AppExternalComponentManager,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async register(externalComponent: IExternalComponent): Promise<void> {
        /* Implementation Hidden */
    }
}

```