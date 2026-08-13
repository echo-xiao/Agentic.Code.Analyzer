## File: packages/apps/src/server/accessors/UIExtend.ts

```typescript
import type { IUIExtend } from '@rocket.chat/apps-engine/definition/accessors';
import type { IUIActionButtonDescriptor } from '@rocket.chat/apps-engine/definition/ui';

import type { UIActionButtonManager } from '../managers/UIActionButtonManager';

export class UIExtend implements IUIExtend {
	constructor(
		private readonly manager: UIActionButtonManager,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public registerButton(button: IUIActionButtonDescriptor): void {
        /* Implementation Hidden */
    }
}

```