## File: apps/meteor/client/components/UserStatusText/ReactiveUserStatusText.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { useUserPresence } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import UserStatusText from './UserStatusText';

export type ReactiveUserStatusTextProps = {
	uid: IUser['_id'];
};

const ReactiveUserStatusText = ({ uid }: ReactiveUserStatusTextProps) => {
    /* Implementation Hidden */
};

export default memo(ReactiveUserStatusText);

```