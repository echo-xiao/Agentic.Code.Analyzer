## File: apps/meteor/server/lib/getSubscriptionAutotranslateDefaultConfig.ts

```typescript
import type { AtLeast, IUser } from '@rocket.chat/core-typings';

import { settings } from '../../app/settings/server';

export function getSubscriptionAutotranslateDefaultConfig(user: AtLeast<IUser, 'settings'>):
	| {
			autoTranslate: boolean;
			autoTranslateLanguage: string;
	  }
	| undefined {
    /* Implementation Hidden */
}

```