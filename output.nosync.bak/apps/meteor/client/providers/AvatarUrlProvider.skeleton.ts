## File: apps/meteor/client/providers/AvatarUrlProvider.tsx

```typescript
import { AvatarUrlContext } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { getURL } from '../../app/utils/client/getURL';
import { roomCoordinator } from '../lib/rooms/roomCoordinator';

export type AvatarUrlProviderProps = {
	children?: ReactNode;
};

const AvatarUrlProvider = ({ children }: AvatarUrlProviderProps) => {
    /* Implementation Hidden */
};

export default AvatarUrlProvider;

```