## File: packages/ui-contexts/src/hooks/useUserAvatarPath.ts

```typescript
import { useContext } from 'react';

import { AvatarUrlContext, type AvatarUrlContextValue } from '../AvatarUrlContext';

export const useUserAvatarPath = (): AvatarUrlContextValue['getUserPathAvatar'] => useContext(AvatarUrlContext).getUserPathAvatar;

```