## File: apps/meteor/server/services/messages/hooks/BeforeSavePreventMention.ts

```typescript
import { Authorization, MeteorError } from '@rocket.chat/core-services';
import type { IMessage, IUser } from '@rocket.chat/core-typings';

import { i18n } from '../../../lib/i18n';

export class BeforeSavePreventMention {
	async preventMention({
		message,
		user,
		mention,
		permission,
	}: {
		message: IMessage;
		user: Pick<IUser, '_id' | 'username' | 'name' | 'language'>;
		mention: 'here' | 'all';
		permission: string;
	}): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```