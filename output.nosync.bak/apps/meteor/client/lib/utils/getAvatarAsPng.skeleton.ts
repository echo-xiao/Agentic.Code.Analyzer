## File: apps/meteor/client/lib/utils/getAvatarAsPng.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

import { getUserAvatarURL } from '../../../app/utils/client/getUserAvatarURL';

export const getAvatarAsPng = (username: IUser['username'], cb: (dataURL: string) => void): (() => void) => {
    /* Implementation Hidden */
};

```