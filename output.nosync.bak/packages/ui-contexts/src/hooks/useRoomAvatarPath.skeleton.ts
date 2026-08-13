## File: packages/ui-contexts/src/hooks/useRoomAvatarPath.ts

```typescript
import { useContext } from 'react';

import { AvatarUrlContext } from '../AvatarUrlContext';

export const useRoomAvatarPath = (): ((...args: any) => string) => useContext(AvatarUrlContext).getRoomPathAvatar;

```