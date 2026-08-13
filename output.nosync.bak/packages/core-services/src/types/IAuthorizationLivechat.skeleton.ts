## File: packages/core-services/src/types/IAuthorizationLivechat.ts

```typescript
import type { IOmnichannelRoom, IUser } from '@rocket.chat/core-typings';

export interface IAuthorizationLivechat {
	canAccessRoom: (room: IOmnichannelRoom, user?: Pick<IUser, '_id'>, extraData?: Record<string, any>) => Promise<boolean>;
}

```