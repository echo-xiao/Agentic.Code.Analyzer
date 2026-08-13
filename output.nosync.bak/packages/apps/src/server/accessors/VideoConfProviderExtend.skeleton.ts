## File: packages/apps/src/server/accessors/VideoConfProviderExtend.ts

```typescript
import type { IVideoConfProvidersExtend } from '@rocket.chat/apps-engine/definition/accessors';
import type { IVideoConfProvider } from '@rocket.chat/apps-engine/definition/videoConfProviders';

import type { AppVideoConfProviderManager } from '../managers/AppVideoConfProviderManager';

export class VideoConfProviderExtend implements IVideoConfProvidersExtend {
	constructor(
		private readonly manager: AppVideoConfProviderManager,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public provideVideoConfProvider(provider: IVideoConfProvider): Promise<void> {
        /* Implementation Hidden */
    }
}

```